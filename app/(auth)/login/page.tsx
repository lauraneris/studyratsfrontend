"use client";

import { useState } from 'react';
import { useAuth, AuthProvider } from '@/app/context/AuthContext';
import Link from 'next/link';

const LoginPageContent = () => {
    // 1. Hooks devem ser declarados no topo do componente
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    // 2. A função handleSubmit é declarada apenas uma vez
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Usuário ou senha inválidos.');
            }

            const data = await response.json();
            // 3. Usamos a versão correta da função login, que também salva o username
            login(data, username);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-semibold">Usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                    >
                        Entrar
                    </button>
                </form>
                <p className="text-center text-sm">
                    Não tem uma conta? <Link href="/register" className="font-semibold text-cyan-600 hover:underline">Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
};

const LoginPage = () => (
    <AuthProvider>
        <LoginPageContent />
    </AuthProvider>
);

export default LoginPage;