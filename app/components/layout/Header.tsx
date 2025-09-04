// app/components/layout/Header.tsx

"use client";

import { Search } from 'lucide-react';
import ProfileIcon from '../ui/ProfileIcon';
import Image from 'next/image';

const Header = () => {
    // Valor de exemplo para os StudyCoins. No futuro, virá da API.
    const studyCoins = 1250;

    return (
        <header className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex justify-end items-center">
                <div className="flex items-center gap-6">

                    {/* BUSCA COM O NOVO ESTILO */}
                    <div className="relative">
                        <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="pl-11 pr-4 py-2.5 w-72 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <Image src="../../imagens/studycoin.png" alt="StudyCoins" width={24} height={24} />
                        <span className="font-bold text-gray-700">{studyCoins}</span>
                    </div>

                    <ProfileIcon />
                </div>
            </div>
        </header>
    );
};

export default Header;