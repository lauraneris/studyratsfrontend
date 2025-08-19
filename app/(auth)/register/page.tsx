"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/api';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name: fullName, username, email, password }),
            });
            if (!response.ok) {
                const data = await response.json();
                const usernameError = data.username?.[0];
                const fallback = 'Falha ao registrar.';
                throw new Error(usernameError || fallback);
            }
            alert('Usuário registrado com sucesso! Você será redirecionado para o login.');
            router.push('/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Criar Conta</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-semibold">Nome Completo</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Crie um nome de usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            pattern="^[\w.@+-]+$"
                            title="Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                    >
                        Registrar
                    </button>
                </form>
                <p className="text-center text-sm">
                    Já tem uma conta? <Link href="/login" className="font-semibold text-cyan-600 hover:underline">Faça o login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;