'use client';

import { useState, useEffect } from 'react';
import HeroBanner from '@/app/components/ui/HeroBanner';
import ThemeCard from '@/app/components/ui/ThemeCard';
import { api } from '@/lib/api';


interface Theme {
    id: number;
    title: string;
    category: string;
    motivational_text: string;
}

const categories = [
    { id: 'todos', name: 'TODOS', color: 'bg-brand-black' },
    { id: 'Social', name: 'SOCIAL', color: 'bg-brand-pink' },
    { id: 'Política', name: 'POLÍTICA', color: 'bg-brand-blue' },
    { id: 'Economia', name: 'ECONOMIA', color: 'bg-brand-green' },
    { id: 'Meio Ambiente', name: 'AMBIENTE', color: 'bg-purple-600' },
    { id: 'Tecnologia', name: 'TECNOLOGIA', color: 'bg-orange-600' },
];

export default function TemasPage() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [filteredThemes, setFilteredThemes] = useState<Theme[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/themes/');
                setThemes(response.data);
                setFilteredThemes(response.data);
            } catch (error) {
                console.error("Erro ao carregar temas:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchThemes();
    }, []);

    useEffect(() => {
        let filtered = themes;

        if (selectedCategory !== 'todos') {
            filtered = filtered.filter(theme =>
                theme.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (searchTerm) {
            filtered = filtered.filter(theme =>
                theme.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredThemes(filtered);
    }, [searchTerm, selectedCategory, themes]);

    return (
        <div>
            <HeroBanner />

            {/* Filtros e Busca */}
            <div className="bg-white neo-card p-6 mb-12">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        placeholder="BUSCAR TEMAS PELO TÍTULO..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-4 border-brand-black h-12 text-lg font-black placeholder:text-gray-500 px-4 w-full"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 neo-button font-black text-sm transition-all ${selectedCategory === category.id
                                ? `${category.color} text-white`
                                : 'bg-white text-brand-black hover:bg-gray-100'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Temas */}
            {isLoading ? (
                <div className="text-center font-black text-2xl">A carregar temas...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredThemes.map((theme) => (
                        <ThemeCard
                            key={theme.id}
                            id={theme.id}
                            title={theme.title}
                            category={theme.category}
                            motivationalText={theme.motivational_text}
                        />
                    ))}
                </div>
            )}

            {!isLoading && filteredThemes.length === 0 && (
                <div className="text-center py-12">
                    <img
                        src="/imagens/stuart.png"
                        alt="Stuart triste"
                        className="w-32 h-32 mx-auto mb-4 opacity-50"
                    />
                    <h3 className="text-2xl font-black mb-2">NENHUM TEMA ENCONTRADO</h3>
                    <p className="text-gray-600 font-regular">
                        Tente ajustar os filtros ou procurar por outros termos.
                    </p>
                </div>
            )}
        </div>
    );
}