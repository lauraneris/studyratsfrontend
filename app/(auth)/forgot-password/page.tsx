// app/(auth)/forgot-password/page.tsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { Mail, ArrowLeft } from 'lucide-react';

// Reutilizamos a classe do botão principal para manter a consistência
const brandBtn = [
    "w-full", "h-14 md:h-16", "rounded-full", "font-extrabold", "text-white",
    "text-lg md:text-xl", "bg-brand-blue", "shadow-xl shadow-black/10",
    "transition-all", "active:scale-[.98] hover:brightness-110",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40",
].join(" ");

const ForgotPasswordPage = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // Adicionado para consistência
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/password-reset/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            // Mostramos uma mensagem de sucesso genérica independentemente da resposta
            // para evitar que alguém descubra quais e-mails estão registados.
            setMessage("Se uma conta com este e-mail existir, um link de redefinição foi enviado.");

        } catch (err) {
            setError("Ocorreu um erro. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Título */}
            <div
                className={`mb-6 md:mb-8 select-none text-center transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
            >
                <h1 className="text-3xl md:text-4xl font-black text-white">Redefinir Senha</h1>
                <p className="mt-3 text-sm md:text-base font-semibold text-white/90">
                    Sem problemas, acontece!
                </p>
            </div>

            {/* Cartão do formulário */}
            <div
                className={`rounded-[28px] border border-white/25 bg-brand-pink/15 p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-xl shadow-lg transition-all duration-500 ease-out ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
                {message ? (
                    <div className="text-center text-white">
                        <Mail size={40} className="mx-auto text-brand-green mb-4" />
                        <p className="font-semibold">{message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <p className="text-center text-sm text-white/80 -mt-2">
                            Digite o seu e-mail abaixo e enviaremos um link para criar uma nova senha.
                        </p>
                        {/* Campo: Email */}
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <Mail className="h-5 w-5 text-white/80" aria-hidden />
                            </span>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                placeholder="Digite seu e-mail..."
                                className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-4 text-lg text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30"
                                required
                            />
                        </div>

                        {error && <p role="alert" className="mx-auto w-fit rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">{error}</p>}

                        <button type="submit" disabled={loading} className={brandBtn}>
                            {loading ? 'Aguarde...' : 'Enviar Link de Redefinição'}
                        </button>
                    </form>
                )}
            </div>

            {/* Link para voltar */}
            <p className={`mt-6 text-center text-sm text-white/90 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <Link href="/login" className="font-semibold underline-offset-4 hover:underline inline-flex items-center gap-2">
                    <ArrowLeft size={16} /> Voltar para o Login
                </Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;