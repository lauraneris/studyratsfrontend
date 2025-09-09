"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { KeyRound, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const brandBtn = [
    "w-full", "h-14 md:h-16", "rounded-full", "font-extrabold", "text-white",
    "text-lg md:text-xl", "bg-brand-blue", "shadow-xl shadow-black/10",
    "transition-all", "active:scale-[.98] hover:brightness-110",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40",
].join(" ");

const ResetPasswordForm = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const searchParams = useSearchParams();
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const token = searchParams.get('token');
    const uidb64 = searchParams.get('uidb64');

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
                const errorMsg = data.new_password2?.[0] || 'Link inválido ou expirado.';
                throw new Error(errorMsg);
            }
            setMessage('Senha redefinida com sucesso! A redirecionar para o login...');
            setTimeout(() => router.push('/login'), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    if (!token || !uidb64) {
        return (
            <div className={`w-full max-w-sm text-center rounded-[28px] border border-white/25 bg-brand-pink/15 p-10 backdrop-blur-xl shadow-lg`}>
                <h1 className="text-xl font-bold text-red-100">Link Inválido</h1>
                <p className="text-white/80 mt-2">O link de redefinição de senha parece estar incompleto ou quebrado.</p>
                <Link href="/login" className="font-bold text-brand-blue hover:underline mt-6 block">
                    Voltar ao Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full">

            <div className={`mb-6 md:mb-8 select-none text-center transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
                <KeyRound size={40} className="mx-auto text-white/90 mb-4" />
                <h1 className="text-3xl md:text-4xl font-black text-white">Crie uma Nova Senha</h1>
                <p className="mt-3 text-sm md:text-base font-semibold text-white/90">
                    Escolha uma senha forte e segura.
                </p>
            </div>


            <div className={`rounded-[28px] border border-white/25 bg-brand-pink/15 p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-xl shadow-lg transition-all duration-500 ease-out ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                {message ? (
                    <div className="text-center text-white">
                        <p className="font-semibold text-lg">{message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <Lock className="h-5 w-5 text-white/80" />
                            </span>
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} placeholder="Digite a nova senha..." className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-12 text-lg text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30" required />
                            <button type="button" onClick={() => setShowPassword(s => !s)} disabled={loading} className="absolute inset-y-0 right-3 flex items-center rounded-full p-2 text-gray-700/70 hover:bg-white/60">
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>


                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <Lock className="h-5 w-5 text-white/80" />
                            </span>
                            <input type={showPasswordConfirm ? "text" : "password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} disabled={loading} placeholder="Confirme a nova senha..." className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-12 text-lg text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30" required />
                            <button type="button" onClick={() => setShowPasswordConfirm(s => !s)} disabled={loading} className="absolute inset-y-0 right-3 flex items-center rounded-full p-2 text-gray-700/70 hover:bg-white/60">
                                {showPasswordConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {error && <p role="alert" className="mx-auto w-fit rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">{error}</p>}

                        <button type="submit" disabled={loading} className={brandBtn}>
                            {loading ? 'A guardar...' : 'Salvar Nova Senha'}
                        </button>
                    </form>
                )}
            </div>

            <p className={`mt-6 text-center text-sm text-white/90 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <Link href="/login" className="font-semibold underline-offset-4 hover:underline inline-flex items-center gap-2">
                    <ArrowLeft size={16} /> Voltar para o Login
                </Link>
            </p>
        </div>
    );
};


const ResetPasswordPage = () => (
    <Suspense fallback={<div className="text-white text-center"> Carregando...</div>}>
        <ResetPasswordForm />
    </Suspense>
);

export default ResetPasswordPage;