'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User as UserIcon } from 'lucide-react';

const getPageTitle = (pathname: string) => {
    if (pathname.startsWith('/temas')) return 'Explore Nossos Temas';
    if (pathname.startsWith('/correcao')) return 'Correção Automática';
    if (pathname.startsWith('/gerar')) return 'Gerar Proposta';
    if (pathname.startsWith('/simulado')) return 'Gerar Simulado';
    if (pathname.startsWith('/historico')) return 'Meu Histórico';
    if (pathname.startsWith('/perfil')) return 'Meu Perfil';
    return 'Study Rats';
};

export default function Header() {
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname);

    return (
        <header className="bg-white neo-card rounded-none border-b-4 border-brand-black sticky top-0 z-10">
            <div className="px-6 py-4 h-20">
                <div className="flex items-center justify-between h-full">
                    {/* Título da Página */}
                    <h1 className="text-2xl md:text-3xl font-black text-brand-black animate-fade-in-down">
                        {pageTitle}
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* Barra de Busca (funcionalidade a ser implementada) */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                placeholder="Buscar..."
                                className="pl-10 pr-4 py-2 border-3 border-brand-black h-12 w-64 font-sans font-semibold neo-button"
                            />
                        </div>

                        {/* Ícone de Perfil */}
                        <Link
                            href="/perfil"
                            className={`p-3 neo-button font-black ${pathname.startsWith('/perfil')
                                ? 'bg-brand-pink text-white'
                                : 'bg-white text-brand-black hover:bg-brand-blue hover:text-white'
                                }`}
                        >
                            <UserIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}