"use client";

import { PlusCircle, Search } from 'lucide-react';
import ProfileIcon from '../ui/ProfileIcon';

const Header = () => {
    return (
        <header className="bg-gray-50 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Início / Temas</p>
                    <h1 className="text-4xl font-bold text-gray-800">Temas de Redação</h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100">
                        <PlusCircle size={20} />
                        Gerar proposta
                    </button>

                    <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar um tema"
                            className="pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <ProfileIcon />
                </div>
            </div>
        </header>
    );
};

export default Header;