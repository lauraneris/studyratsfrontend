"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { KeyRound } from 'lucide-react';


const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState<string | null>(null);
    const [uidb64, setUidb64] = useState<string | null>(null);

    useEffect(() => {
        setToken(searchParams.get('token'));
        setUidb64(searchParams.get('uidb64'));
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("As senhas não coincidem.");
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/password-reset/confirm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_password1: password, new_password2: passwordConfirm, uidb64, token }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Link inválido ou expirado.');
            }
            setMessage('Senha redefinida com sucesso!');

            setTimeout(() => router.push('/login'), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    if (!token || !uidb64) {
        return (
            <div className="w-full max-w-sm text-center">
                <h1 className="text-xl font-bold text-red-600">Link Inválido</h1>
                <p className="text-gray-600 mt-2">O link de redefinição de senha parece estar incompleto.</p>
                <Link href="/forgot-password" className="font-bold text-brand-blue hover:underline mt-4 block">
                    Tentar novamente
                </Link>
            </div>
        );
    }

    if (message) {
        return (
            <div className="p-4 text-center bg-green-100 text-green-800 rounded-lg">
                <p>{message}</p>
                <Link href="/login" className="font-bold text-brand-blue hover:underline mt-4 block">
                    Ir para o Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm">
            <KeyRound size={40} className="mx-auto text-brand-blue mb-4" />
            <h1 className="text-3xl font-black text-center text-gray-800">Crie uma Nova Senha</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                <div>
                    <label className="font-semibold text-gray-700">Nova Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
                </div>
                <div>
                    <label className="font-semibold text-gray-700">Confirmar Nova Senha</label>
                    <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-brand-blue rounded-lg hover:bg-brand-blue/90 transition-colors disabled:bg-gray-400">
                    {loading ? 'Aguarde...' : 'Salvar Nova Senha'}
                </button>
            </form>
        </div>
    );
};
const ResetPasswordPage = () => (
    <Suspense fallback={<div>Carregando...</div>}>
        <ResetPasswordForm />
    </Suspense>
);

export default ResetPasswordPage;