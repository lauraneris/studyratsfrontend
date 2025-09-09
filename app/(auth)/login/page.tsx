// app/(auth)/login/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { API_URL } from "@/lib/api";

const btn =
    "w-full h-14 md:h-16 rounded-full font-extrabold text-white text-lg md:text-xl bg-[#08CCED] shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition active:scale-[.98] hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40";

export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // ... (A lógica de state e a função handleSubmit permanecem inalteradas) ...
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        const user = username.trim();
        if (!user || !password) {
            setError("Preencha usuário e senha.");
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            const res = await fetch(`${API_URL}/api/token/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password }),
                signal: controller.signal,
            });
            clearTimeout(timeout);
            if (!res.ok) throw new Error("Usuário ou senha inválidos.");
            const data = await res.json();
            login(data, user);
        } catch (err) {
            const m =
                err instanceof Error
                    ? err.name === "AbortError"
                        ? "Tempo de resposta excedido."
                        : err.message
                    : "Ocorreu um erro.";
            setError(m);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            {/* 1. NOVO CONTAINER PARA LOGO E MASCOTE */}
            <div className={`relative flex justify-center items-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                {/* Logo com tamanho ajustado */}
                <div className="select-none z-10">
                    <Image
                        src="/imagens/logo.png"
                        alt="Study Rats"
                        width={600}
                        height={215}
                        priority
                        className="h-auto w-[min(80vw,400px)] drop-shadow-[0_12px_0_rgba(0,0,0,0.35)]"
                    />
                </div>

            </div>

            <div className={`relative mx-auto mt-4 w-full max-w-lg`}>

                <div className={`relative z-10 rounded-[28px] border border-white/30 bg-[#FF4FB4]/85 px-6 py-8 pt-16 sm:px-8 md:px-10 md:py-12 md:pt-20 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                    <h2 className="text-center font-bold text-xl text-white/90 mb-6">Bom te ver de novo! Faça seu login.</h2>

                    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6" noValidate>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 grid place-content-center">
                                <User className="h-5 w-5 text-white/80" />
                            </span>
                            <input
                                id="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                                placeholder="Digite seu nome de usuário..."
                                className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-5 text-lg text-pink-900 placeholder-white/80 outline-none transition focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-[#08CCED]/35 shadow-[0_12px_28px_rgba(0,0,0,0.15)]"
                                required
                            />
                        </div>

                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 grid place-content-center">
                                <Lock className="h-5 w-5 text-white/80" />
                            </span>
                            <input
                                id="password"
                                type={show ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                placeholder="Digite sua senha..."
                                className="h-14 w-full rounded-full border-2 border-pink-300/70 bg-white/70 pl-12 pr-12 text-lg text-pink-900 placeholder-white/80 outline-none transition focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-[#08CCED]/35 shadow-[0_12px_28px_rgba(0,0,0,0.15)]"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShow((s) => !s)}
                                disabled={loading}
                                className="absolute inset-y-0 right-3 grid place-content-center rounded-full p-2 text-gray-700/70 hover:bg-white/60"
                                aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {error && (
                            <p className="mx-auto w-fit rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white" role="alert">
                                {error}
                            </p>
                        )}

                        <button type="submit" disabled={loading} className={btn}>
                            {loading ? "Entrando…" : "Login"}
                        </button>

                        <div className="-mt-2 text-center text-sm">
                            <Link href="/forgot-password" className="font-semibold text-white/90 underline-offset-4 hover:underline">
                                Esqueceu a senha?
                            </Link>
                        </div>
                    </form>

                    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/35" />
                    <div className="pointer-events-none absolute inset-x-8 bottom-6 h-28 rounded-[24px] bg-black/10 blur-2xl" />
                </div>
            </div>

            <p className="mt-8 text-center text-white/90">
                Não tem uma conta? <Link href="/register" className="font-extrabold underline">Cadastre-se</Link>
            </p>
        </div>
    );
}