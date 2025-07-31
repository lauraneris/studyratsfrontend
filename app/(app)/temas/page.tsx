"use client";

import { useState, useEffect, useMemo } from 'react';
import Header from "@/app/components/layout/Header";
import FilterTag from "@/app/components/ui/FilterTag";
import ThemeCard from "@/app/components/ui/ThemeCard";
import Link from "next/link";

interface Theme {
    id: number;
    title: string;
    category: string;
    image_url: string;
    status?: 'pending' | 'completed';
}

const TemasPage = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/themes/');
                if (!response.ok) throw new Error('Falha ao buscar temas.');
                const data = await response.json();
                setThemes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchThemes();
    }, []);

    const tags = ["ENEM", "UFPR", "Política", "Social", "Tecnologia", "Meio Ambiente", "Segurança"];

    const filteredThemes = useMemo(() => {
        return themes.filter(theme => {
            const matchesTag = activeTag ? theme.category === activeTag : true;
            const matchesSearch = theme.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesTag && matchesSearch;
        });
    }, [themes, activeTag, searchTerm]);

    const handleTagClick = (tag: string) => {
        setActiveTag(prev => (prev === tag ? null : tag));
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="px-8 pb-8">
                <div className="flex items-center gap-3 mb-8">
                    {tags.map((tag) => (
                        <FilterTag
                            key={tag}
                            label={tag}
                            isActive={activeTag === tag}
                            onClick={() => handleTagClick(tag)}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <p>Carregando temas...</p>
                    ) : (
                        filteredThemes.length > 0 ? (
                            filteredThemes.map((theme) => (
                                <Link href={`/escrever/${theme.id}`} key={theme.id}>
                                    <ThemeCard
                                        imageUrl={theme.image_url || "/imagens/theme-autismo.jpg"}
                                        title={theme.title}
                                        status={theme.status || 'pending'}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-4 text-center text-gray-500">Nenhum tema encontrado com os filtros selecionados.</p>
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default TemasPage;