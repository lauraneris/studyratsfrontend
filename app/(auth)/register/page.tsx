// app/(auth)/register/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/api';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// Reutilizamos a classe do botão que você definiu na página de login para manter a consistência
const brandBtn = [
    "w-full", "h-14 md:h-16", "rounded-full", "font-extrabold", "text-white",
    "text-lg md:text-xl", "bg-brand-blue", "shadow-xl shadow-black/10",
    "transition-all", "active:scale-[.98] hover:brightness-110",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40",
].join(" ");

const RegisterPage = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (loading) return;
        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Logo & subtítulo */}
            <div
                className={`mb-6 md:mb-8 select-none text-center transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
                    }`}
            >
                <Image
                    src="/imagens/logo.png"
                    alt="Logo Study Rats"
                    width={360}
                    height={240}
                    priority
                    sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 360px"
                    className="mx-auto h-auto w-44 sm:w-56 md:w-64 lg:w-80"
                />
                <p className="mt-3 text-sm md:text-base font-semibold text-white/90">
                    Crie sua conta para começar.
                </p>
            </div>

            {/* Cartão do formulário */}
            <div
                className={`rounded-[28px] border border-white/25 bg-brand-pink/15 p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-xl shadow-lg transition-all duration-500 ease-out ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                    {/* Campo: Usuário */}
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                            <User className="h-5 w-5 text-white/80" aria-hidden />
                        </span>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} placeholder="Crie um nome de usuário..." className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-4 text-lg text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30" required />
                    </div>

                    {/* Campo: Email */}
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                            <Mail className="h-5 w-5 text-white/80" aria-hidden />
                        </span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} placeholder="Digite seu e-mail..." className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-4 text-lg text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30" required />
                    </div>

                    {/* Campo: Senha */}
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                            <Lock className="h-5 w-5 text-white/80" aria-hidden />
                        </span>
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} placeholder="Crie uma senha..." className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-12 text-lg text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30" required />
                        <button type="button" onClick={() => setShowPassword(s => !s)} disabled={loading} className="absolute inset-y-0 right-3 flex items-center rounded-full p-2 text-gray-700/70 hover:bg-white/60">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    {error && <p role="alert" className="mx-auto w-fit rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">{error}</p>}

                    <button type="submit" disabled={loading} className={brandBtn}>
                        {loading ? "Criando conta..." : "Registrar"}
                    </button>
                </form>
            </div>

            {/* CTA Login */}
            <p className={`mt-6 text-center text-sm text-white/90 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                Já tem uma conta?{" "}
                <Link href="/login" className="font-semibold underline-offset-4 hover:underline">
                    Faça o login
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;