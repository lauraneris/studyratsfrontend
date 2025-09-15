"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import FilterTag from "@/app/components/ui/FilterTag";
import ThemeCard from "@/app/components/ui/ThemeCard";
import MascotIntro from "@/app/components/ui/MascotIntro";
import HeroBanner from "@/app/components/ui/HeroBanner";
import { useAuth } from "@/app/context/AuthContext";
import { API_URL } from "@/lib/api";

interface Theme {
    id: number;
    title: string;
    category: string;
    image_url: string;
    status?: "pending" | "completed";
}

const gridContainer: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};

const gridItem: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};

function normalize(value: string | null | undefined): string {
    return (value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

const DEFAULT_TAGS = [
    "ENEM",
    "UFPR",
    "Política",
    "Social",
    "Tecnologia",
    "Meio Ambiente",
    "Segurança",
] as const;

type Tag = typeof DEFAULT_TAGS[number] | string;

export default function TemasPage() {
    const { user } = useAuth();
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_URL}/api/themes/`, { signal: controller.signal });
                if (!res.ok) throw new Error(`Falha ao buscar temas (HTTP ${res.status}).`);
                const data: Theme[] = await res.json();
                setThemes(Array.isArray(data) ? data : []);
            } catch (err: unknown) {
                if ((err as any)?.name === "AbortError") return;
                setError(err instanceof Error ? err.message : "Erro inesperado ao carregar temas.");
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    const derivedTags = useMemo(() => {
        const apiTags = Array.from(new Set(themes.map((t) => t.category).filter(Boolean))).sort((a, b) =>
            a.localeCompare(b, "pt-BR")
        );
        const base: Tag[] = [...DEFAULT_TAGS];
        const seen = new Set(base);
        for (const tag of apiTags) {
            if (!seen.has(tag)) {
                base.push(tag);
            }
        }
        return base;
    }, [themes]);

    const filteredThemes = useMemo(() => {
        const nSearch = normalize(searchTerm);
        const nActive = normalize(activeTag ?? "");
        return themes.filter((theme) => {
            const matchesTag = nActive ? normalize(theme.category) === nActive : true;
            const matchesSearch = nSearch ? normalize(theme.title).includes(nSearch) : true;
            return matchesTag && matchesSearch;
        });
    }, [themes, activeTag, searchTerm]);

    const handleTagClick = (tag: string) => setActiveTag((prev) => (prev === tag ? null : tag));

    const greeting = `Olá, ${user?.username ?? "aluno(a)"}! 👋  Eu sou o Stuart, seu corretor pessoal. Escolha um tema para começar a sua redação.`;

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
            <main className="max-w-7xl mx-auto">
                <div className="relative my-6">
                    <HeroBanner src="/imagens/paginaprincipal.png" alt="Banner principal da plataforma Study Rats" objectPosition="55% 50%" />
                    <div className="hidden md:block absolute left-6 bottom-6">
                        <MascotIntro username={user?.username} message={greeting} bubbleColorClass="bg-brand-pink" />
                    </div>
                </div>
                <div className="md:hidden mb-6">
                    <MascotIntro username={user?.username} message={greeting} bubbleColorClass="bg-brand-pink" />
                </div>

                <motion.div
                    className="flex flex-wrap justify-center items-center gap-3 mb-12"
                    variants={gridContainer}
                    initial="hidden"
                    animate="visible"
                    aria-label="Filtros por categoria"
                >
                    {derivedTags.map((tag) => (
                        <motion.div key={tag} variants={gridItem}>
                            <FilterTag
                                label={tag}
                                isActive={activeTag === tag}
                                onClick={() => handleTagClick(tag)}
                                aria-pressed={activeTag === tag}
                                aria-label={`Filtrar por ${tag}`}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={gridContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {loading &&
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={`skeleton-${i}`} className="h-64 rounded-2xl bg-gray-200 animate-pulse" aria-hidden />
                        ))}

                    {!loading && error && <p className="col-span-full text-center text-red-600">{error}</p>}

                    {!loading && !error && filteredThemes.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">Nenhum tema encontrado.</p>
                    )}

                    {!loading && !error &&
                        filteredThemes.map((theme) => (
                            <motion.div key={theme.id} variants={gridItem}>
                                <ThemeCard
                                    id={theme.id}
                                    imageUrl={theme.image_url || "/imagens/theme-autismo.jpg"}
                                    title={theme.title}
                                    status={theme.status ?? "pending"}
                                />
                            </motion.div>
                        ))}
                </motion.div>
            </main>
        </div>
    );
}