'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Home, FileText, PlusCircle, BookOpen, History,
    ChevronLeft, ChevronRight, Users, FileEdit, CheckSquare
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const studentNavItems = [
    { name: 'Temas', icon: Home, path: '/temas' },
    { name: 'Correção', icon: FileText, path: '/correcao' },
    { name: 'Gerar', icon: PlusCircle, path: '/gerar' },
    { name: 'Simulado', icon: BookOpen, path: '/simulado' },
    { name: 'Histórico', icon: History, path: '/historico' },
];


const professorNavItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard-professor' },
    { name: 'Alunos', icon: Users, path: '/gerenciar-alunos' },
    { name: 'Criar Conteúdo', icon: FileEdit, path: '/criar-conteudo' },
    { name: 'Correções', icon: CheckSquare, path: '/correcoes' },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();

    // ATUALIZADO: Lógica para escolher o menu correto
    const isProfessor = user?.profile?.role === 'teacher';
    const navItems = isProfessor ? professorNavItems : studentNavItems;
    const homePath = isProfessor ? '/dashboard-professor' : '/temas';

    return (
        <div
            className={`bg-white neo-card rounded-none border-r-4 border-brand-black transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                } flex flex-col sticky top-0 h-screen`}
        >
            <div className="p-4 border-b-4 border-brand-black flex items-center justify-between h-20">
                {!isCollapsed && (
                    <Link href={homePath} className="flex items-center gap-3">
                        <Image
                            src="/imagens/logo.png"
                            alt="Study Rats Logo"
                            width={140}
                            height={40}
                            priority
                        />
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="neo-button p-2 bg-brand-blue text-white hover:bg-brand-pink"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center gap-3 p-3 neo-button font-black text-sm transition-all w-full ${pathname.startsWith(item.path)
                                ? 'bg-brand-pink text-white'
                                : 'bg-white text-brand-black hover:bg-brand-blue hover:text-white'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {!isCollapsed && <span>{item.name.toUpperCase()}</span>}
                    </Link>
                ))}
            </nav>

            {/* Saldo de StuartCoins (apenas para alunos) */}
            {!isCollapsed && !isProfessor && (
                <div className="p-4 border-t-4 border-brand-black">
                    <div className="bg-brand-green text-white p-3 neo-button font-black text-center flex items-center justify-center gap-2">
                        <Image
                            src="/imagens/stuartcoin.png"
                            alt="StuartCoin"
                            width={24}
                            height={24}
                        />
                        <span>{user?.profile?.stuart_coins_balance ?? '...'}</span>
                    </div>
                </div>
            )}
        </div>
    );
}