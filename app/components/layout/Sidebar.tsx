"use client";

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { BookOpen, Send, ClipboardCheck, Wand2, ClipboardList, ChevronsLeft, ChevronsRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
    { href: "/temas", icon: <BookOpen size={24} />, label: "Temas" },
    { href: "/correcao", icon: <Send size={24} />, label: "Corrigir Redação" },
    { href: "/historico", icon: <ClipboardCheck size={24} />, label: "Meu Histórico" },
    { href: "/gerar", icon: <Wand2 size={24} />, label: "Gerar Proposta" },
    { href: "/simulado", icon: <ClipboardList size={24} />, label: "Simulados" },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'w-72' : 'w-24'}`}>

            {/* INÍCIO DA ALTERAÇÃO */}
            <div className="p-6 flex justify-center items-center h-[120px]">
                {isExpanded ? (
                    <Image
                        src="/imagens/logo.png"
                        alt="Logo Study Rats"
                        width={200} // Aumentado para maior destaque
                        height={139}
                        priority
                    />
                ) : (
                    <Image
                        src="/imagens/stuart.png"
                        alt="Mascote Study Rats"
                        width={80}
                        height={80}
                        priority
                    />
                )}
            </div>

            {/* Aumentado o espaçamento entre os itens (gap-y-4) e o padding superior (pt-8) */}
            <nav className="flex-grow px-4 pt-8">
                <ul className="flex flex-col gap-y-4">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center p-3 rounded-lg transition-colors font-semibold ${isActive
                                        ? 'bg-brand-pink/10 text-brand-pink'
                                        : 'text-gray-600 hover:bg-brand-pink/10 hover:text-brand-pink'
                                        } ${!isExpanded ? 'justify-center' : ''}`}
                                    title={isExpanded ? '' : item.label}
                                >
                                    {item.icon}
                                    {isExpanded && <span className="ml-4 font-semibold">{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* FIM DA ALTERAÇÃO */}

            <div className="border-t border-gray-200 p-4 mt-auto">
                <button
                    onClick={logout}
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-brand-pink/10 hover:text-brand-pink w-full mb-2"
                >
                    <LogOut size={24} />
                    {isExpanded && <span className="ml-4 font-semibold">Sair</span>}
                </button>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 w-full"
                >
                    {isExpanded ? <ChevronsLeft size={24} /> : <ChevronsRight size={24} />}
                    {isExpanded && <span className="ml-4 font-semibold">Recolher</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;