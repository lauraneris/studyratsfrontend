"use client";

import { useAuth } from "@/app/context/AuthContext";
import { User, Settings, LogOut } from 'lucide-react';
import Link from "next/link";

const ProfileDropdown = () => {
    const { user, logout } = useAuth();

    return (
        <div className="absolute top-12 right-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">{user?.username || 'Usuário'}</p>
                <p className="text-sm text-gray-500">Aluno</p>
            </div>
            <div className="py-1">
                <Link href="/perfil" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <User size={16} />
                    Meu Perfil
                </Link>
                <Link href="/configuracoes" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <Settings size={16} />
                    Configurações
                </Link>
            </div>
            <div className="py-1">
                <button onClick={logout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50">
                    <LogOut size={16} />
                    Sair
                </button>
            </div>
        </div>
    );
};

export default ProfileDropdown;