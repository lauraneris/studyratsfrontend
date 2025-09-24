// app/(app)/gerenciar-alunos/page.tsx

'use client';

import RoleGuard from '@/app/(auth)/RoleGuard';
import { Users, PlusCircle } from 'lucide-react';

// Dados simulados para a lista de alunos
const mockStudents = [
    { id: 1, name: 'Ana Carolina Pereira', email: 'ana.carolina@email.com', lastActivity: '2025-09-14', averageScore: 880 },
    { id: 2, name: 'Bruno Alves de Souza', email: 'bruno.alves@email.com', lastActivity: '2025-09-12', averageScore: 760 },
    { id: 3, name: 'Clara Farias Lima', email: 'clara.farias@email.com', lastActivity: '2025-09-15', averageScore: 910 },
    { id: 4, name: 'Diego Martins Rocha', email: 'diego.martins@email.com', lastActivity: '2025-09-11', averageScore: 820 },
    { id: 5, name: 'Eduarda Gonçalves', email: 'eduarda.goncalves@email.com', lastActivity: '2025-09-13', averageScore: 790 },
];

export default function GerenciarAlunosPage() {
    return (
        <RoleGuard allowedRoles={['teacher']}>
            <div className="space-y-8">
                {/* Cabeçalho da Página */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Users className="w-10 h-10 text-brand-pink" />
                        <h1 className="text-3xl font-black text-brand-black">Gerir Alunos</h1>
                    </div>
                    <button className="bg-brand-green text-white neo-button font-black text-lg px-6 py-3 hover:bg-brand-blue flex items-center gap-2">
                        <PlusCircle className="w-5 h-5" />
                        ADICIONAR ALUNO
                    </button>
                </div>

                {/* Tabela de Alunos */}
                <div className="bg-white neo-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-brand-black text-white">
                                <tr>
                                    <th className="text-left font-black p-4">NOME DO ALUNO</th>
                                    <th className="text-left font-black p-4 hidden md:table-cell">E-MAIL</th>
                                    <th className="text-left font-black p-4 hidden lg:table-cell">ÚLTIMA ATIVIDADE</th>
                                    <th className="text-center font-black p-4">NOTA MÉDIA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockStudents.map((student, index) => (
                                    <tr key={student.id} className="border-b-4 border-brand-black">
                                        <td className="p-4 font-black text-brand-black">{student.name}</td>
                                        <td className="p-4 font-sans text-gray-700 hidden md:table-cell">{student.email}</td>
                                        <td className="p-4 font-sans text-gray-600 hidden lg:table-cell">{new Date(student.lastActivity).toLocaleDateString('pt-BR')}</td>
                                        <td className="p-4 font-black text-2xl text-center text-brand-blue">{student.averageScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </RoleGuard>
    );
}