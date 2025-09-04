"use client";

import { useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/password-reset/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage("Se uma conta com este e-mail existir, um link de redefinição foi enviado.");
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setMessage("Ocorreu um erro. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <Mail size={40} className="mx-auto text-brand-blue mb-4" />
            <h1 className="text-3xl font-black text-center text-gray-800">Redefinir Senha</h1>
            <p className="text-center text-gray-500 mb-8">Digite o seu e-mail para receber o link de redefinição.</p>

            {message ? (
                <div className="p-4 text-center bg-green-100 text-green-800 rounded-lg">
                    <p>{message}</p>
                    <Link href="/login" className="font-bold text-brand-blue hover:underline mt-4 block">
                        Voltar para o Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-semibold text-gray-700">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 font-bold text-white bg-brand-blue rounded-lg hover:bg-brand-blue/90 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Aguarde...' : 'Enviar Link'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ForgotPasswordPage;