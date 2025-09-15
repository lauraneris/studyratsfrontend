"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    stuartCoins?: number;
}

interface AuthContextType {
    user: User | null;
    login: (tokens: { access: string; refresh: string }, username: string) => void;
    logout: () => void;
    deductCoins: (amount: number) => void; // 1. Adicionar a nova função
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser({ username, stuartCoins: 1250 });
        }
    }, []);

    const login = (tokens: { access: string; refresh: string }, username: string) => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        localStorage.setItem('username', username);
        setUser({ username, stuartCoins: 1250 });
        router.push('/temas');
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        router.push('/login');
    };

    // 2. Implementar a função para deduzir moedas
    const deductCoins = (amount: number) => {
        setUser(currentUser => {
            if (!currentUser || (currentUser.stuartCoins ?? 0) < amount) {
                // Se o usuário não existir ou não tiver moedas suficientes, não faz nada.
                // A verificação principal será feita na página de correção.
                return currentUser;
            }
            // Retorna um novo objeto de usuário com o saldo atualizado
            return { ...currentUser, stuartCoins: (currentUser.stuartCoins ?? 0) - amount };
        });
    };

    return (
        // 3. Passar a função para o provedor
        <AuthContext.Provider value={{ user, login, logout, deductCoins }}>
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