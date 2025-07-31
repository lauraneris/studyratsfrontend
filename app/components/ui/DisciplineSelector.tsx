"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const disciplines = ['Biologia', 'Química', 'Matemática', 'Física', 'Filosofia', 'Sociologia', 'História', 'Português', 'Inglês', 'Espanhol', 'Literatura'];

const DisciplineSelector = () => {
    const [counts, setCounts] = useState<Record<string, number>>(
        disciplines.reduce((acc, discipline) => ({ ...acc, [discipline]: 1 }), {})
    );

    const handleCountChange = (discipline: string, delta: number) => {
        setCounts(prev => ({
            ...prev,
            [discipline]: Math.max(0, prev[discipline] + delta)
        }));
    };

    return (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Disciplina</h3>
            <div className="space-y-2">
                {disciplines.map(discipline => (
                    <div key={discipline} className="flex justify-between items-center">
                        <span className="text-gray-800">{discipline}</span>
                        <div className="flex items-center gap-3">
                            <button onClick={() => handleCountChange(discipline, -1)} className="text-gray-500 hover:text-red-500"><Minus size={16} /></button>
                            <span className="font-semibold w-4 text-center">{counts[discipline]}</span>
                            <button onClick={() => handleCountChange(discipline, 1)} className="text-gray-500 hover:text-green-500"><Plus size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisciplineSelector;