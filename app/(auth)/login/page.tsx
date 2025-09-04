"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { API_URL } from "@/lib/api";
import Image from "next/image";

const brandBtn =
    "w-full h-14 rounded-full font-extrabold text-white bg-brand-blue shadow-lg shadow-black/10 transition-transform active:scale-[.98] hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40";

export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const user = username.trim();
        const pass = password;
        if (!user || !pass) {
            setError("Preencha usuário e senha.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/token/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass }),
            });

            if (!res.ok) throw new Error("Usuário ou senha inválidos.");
            const data = await res.json();
            login(data, user);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocorreu um erro.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            {/* Logo com animação Tailwind */}
            <div
                className={`mb-8 select-none text-center transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
                    }`}
            >
                <Image
                    src="/imagens/logo.png"
                    alt="Logo Study Rats"
                    width={240}
                    height={120}
                    priority
                    className="mx-auto h-auto w-40 sm:w-48 md:w-60 lg:w-72"
                />
                <p className="mt-3 text-white/80">Faça o login para continuar.</p>
            </div>

            {/* Cartão vítreo */}
            <div
                className={`rounded-3xl border border-white/20 bg-white/20 p-6 backdrop-blur-xl md:p-8 transition-all duration-500 ease-out ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Usuário */}
                    <div>
                        <label htmlFor="username" className="sr-only">
                            Usuário
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <User className="h-5 w-5 text-white/80" aria-hidden />
                            </span>
                            <input
                                id="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                                placeholder="Username"
                                className="h-14 w-full rounded-full border-2 border-pink-300/60 bg-white/70 pl-12 pr-4 text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30"
                                required
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Senha
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                <Lock className="h-5 w-5 text-white/80" aria-hidden />
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                placeholder="Password"
                                className="h-14 w-full rounded-full border-2 border-pink-300/60 bg-white/70 pl-12 pr-12 text-gray-800 placeholder-pink-400/90 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-brand-blue/30"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute inset-y-0 right-3 flex items-center rounded-full p-2 text-gray-700/70 hover:bg-white/60"
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Erro */}
                    <div aria-live="polite" className="min-h-6">
                        {error && (
                            <p className="mx-auto w-fit rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Botão */}
                    <button type="submit" disabled={loading} className={brandBtn}>
                        {loading ? "Entrando…" : "Login"}
                    </button>

                    {/* Links de apoio */}
                    <div className="pt-2 text-center text-sm">
                        <Link
                            href="/forgot-password"
                            className="font-medium text-gray-900/80 underline-offset-4 hover:underline"
                        >
                            Esqueceu a senha?
                        </Link>
                    </div>
                </form>
            </div>

            {/* CTA de cadastro único */}
            <p
                className={`mt-6 text-center text-sm text-white/90 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
            >
                Não tem uma conta?{" "}
                <Link href="/register" className="font-semibold underline-offset-4 hover:underline">
                    Cadastre-se
                </Link>
            </p>
        </div>
    );
}
