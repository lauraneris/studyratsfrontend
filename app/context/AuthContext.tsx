'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface UserProfile {
    role: 'student' | 'teacher' | 'admin';
    stuart_coins_balance: number;
}
interface User {
    id: number;
    username: string;
    email: string;
    profile: UserProfile;
}
interface LoginData {
    username: string;
    password: string;
}
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                try {
                    const userResponse = await api.get('/profile/me/');

                    // SIMULAÇÃO DE ROLE PARA TESTES
                    const userData = {
                        ...userResponse.data,
                        profile: userResponse.data.profile || { role: 'student', stuart_coins_balance: 0 }
                    };
                    // Para testar como professor, descomente a linha abaixo:
                    // userData.profile.role = 'teacher';

                    setUser(userData);
                } catch (error) {
                    logout();
                }
            }
            setIsLoading(false);
        };
        checkAuthStatus();
    }, []);

    const login = async (data: LoginData) => {
        setIsLoading(true);
        try {
            const response = await api.post('/token/', data);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;

            const userResponse = await api.get('/profile/me/');

            // Adicionamos uma verificação de segurança para o caso de o perfil não existir
            const userData = {
                ...userResponse.data,
                profile: userResponse.data.profile || { role: 'student', stuart_coins_balance: 0 }
            };

            // Para testar como professor, descomente a linha abaixo:
            //userData.profile.role = 'teacher';

            setUser(userData);

            if (userData.profile.role === 'teacher') {
                router.push('/dashboard-professor');
            } else {
                router.push('/temas');
            }

        } catch (error) {
            console.error('Falha no login', error);
            logout();
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete api.defaults.headers['Authorization'];
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};