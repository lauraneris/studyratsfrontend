"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/api';

const RegisterPage = () => {
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
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                const data = await response.json();
                const usernameError = data.username?.[0];
                const emailError = data.email?.[0];
                const fallback = 'Falha ao registrar. Verifique os dados.';
                throw new Error(usernameError || emailError || fallback);
            }
            alert('Usuário registrado com sucesso! Você será redirecionado para o login.');
            router.push('/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h1 className="text-3xl font-black text-center text-gray-800">Crie sua Conta</h1>
            <p className="text-center text-gray-500 mb-8">É rápido e fácil!</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="font-semibold text-gray-700">Nome de Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold text-gray-700">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full px-4 py-3 font-bold text-white bg-brand-blue rounded-lg hover:bg-brand-blue/90 transition-colors"
                >
                    Registrar
                </button>
            </form>
            <p className="text-center text-sm mt-6">
                Já tem uma conta?{' '}
                <Link href="/login" className="font-semibold text-brand-pink hover:underline">
                    Faça o login
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;