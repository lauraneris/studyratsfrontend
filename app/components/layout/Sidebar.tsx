"use client";

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { BookOpen, Send, ClipboardCheck, Wand2, ClipboardList, ChevronsLeft, ChevronsRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: "/temas", icon: <BookOpen size={24} />, label: "Home" },
    { href: "/correcao", icon: <Send size={24} />, label: "Corrigir" },
    { href: "/historico", icon: <ClipboardCheck size={24} />, label: "Histórico" },
    { href: "/gerar", icon: <Wand2 size={24} />, label: "Proposta Personalizada" },
    { href: "/simulado", icon: <ClipboardList size={24} />, label: "Simulados" },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-24'}`}>
            <div className={`p-4 pb-2 flex ${isExpanded ? 'justify-between' : 'justify-center'}`}>
                <h1 className={`font-bold text-gray-800 overflow-hidden transition-all ${isExpanded ? 'text-2xl' : 'text-xs'}`}>
                    {isExpanded ? "RedaBot" : "RB"}
                </h1>
            </div>

            <nav className="flex-grow px-4 pt-4">
                <ul className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center p-3 rounded-lg transition-colors font-semibold ${isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        } ${!isExpanded ? 'justify-center' : ''}`}
                                    title={isExpanded ? '' : item.label}
                                >
                                    {item.icon}
                                    {isExpanded && <span className="ml-4">{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="border-t border-gray-200 p-4 mt-auto">
                <button
                    onClick={logout}
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 w-full mb-2"
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