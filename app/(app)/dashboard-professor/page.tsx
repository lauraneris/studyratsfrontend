'use client';

import RoleGuard from '@/app/(auth)/RoleGuard';
import StatCard from '@/app/components/ui/StatCard';
import { Users, FileEdit, CheckSquare, TrendingUp, PlusCircle, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Dados simulados para o dashboard
const mockStats = {
    totalAlunos: 32,
    redacoesPendentes: 7,
    propostasCriadas: 12,
    correcoesRealizadas: 58,
};

const mockRecentActivity = [
    { tipo: "redacao", aluno: "Beatriz Costa", tema: "Inteligência Artificial no mercado de trabalho", data: "2025-09-15" },
    { tipo: "proposta", titulo: "Os limites entre a liberdade de expressão e o discurso de ódio", data: "2025-09-14" },
    { tipo: "correcao", aluno: "Lucas Martins", nota: 920, data: "2025-09-14" },
];

export default function DashboardProfessorPage() {
    return (
        <RoleGuard allowedRoles={['teacher']}>
            <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-brand-blue neo-card p-8 relative overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 transform -rotate-1">
                                BEM-VINDO,
                                <br />
                                <span className="text-brand-pink">PROFESSOR!</span>
                            </h1>
                            <p className="text-lg text-white font-sans mb-6">
                                Gerencie seus alunos, crie conteúdos e acompanhe o progresso da turma!
                            </p>
                            <Link href="/criar-conteudo">
                                <button className="bg-brand-green text-white neo-button font-black text-lg px-8 py-4 hover:bg-brand-pink flex items-center gap-2">
                                    <PlusCircle className="w-5 h-5" />
                                    CRIAR CONTEÚDO
                                </button>
                            </Link>
                        </div>
                        <div className="hidden md:flex justify-center">
                            <Image
                                src="/imagens/stuartnerd.png"
                                alt="Stuart Professor"
                                width={250}
                                height={250}
                                className="transform rotate-3 hover:rotate-0 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard Icon={Users} title="Alunos Ativos" value={mockStats.totalAlunos} href="/gerenciar-alunos" iconColorClass="text-brand-blue" />
                    <StatCard Icon={CheckSquare} title="Correções Pendentes" value={mockStats.redacoesPendentes} href="/correcoes" iconColorClass="text-brand-pink" />
                    <StatCard Icon={FileEdit} title="Propostas Criadas" value={mockStats.propostasCriadas} href="/criar-conteudo" iconColorClass="text-brand-green" />
                    <StatCard Icon={TrendingUp} title="Total Corrigidas" value={mockStats.correcoesRealizadas} href="/historico-correcoes" iconColorClass="text-yellow-500" />
                </div>

                {/* Painel de Atividade Recente */}
                <div className="bg-white neo-card">
                    <div className="p-6 border-b-4 border-brand-black">
                        <h2 className="text-2xl font-black text-brand-black flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-brand-green" />
                            Atividade Recente
                        </h2>
                    </div>
                    <div className="divide-y-4 divide-brand-black">
                        {mockRecentActivity.map((activity, index) => (
                            <div key={index} className="p-4 md:p-6">
                                {activity.tipo === "redacao" && (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-black text-lg text-gray-900">Nova Redação Recebida</h3>
                                            <p className="font-sans text-gray-600">
                                                {activity.aluno} enviou uma redação sobre "{activity.tema}"
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-4">
                                            <div className="font-black text-brand-blue">PENDENTE</div>
                                            <div className="font-sans text-gray-500 text-sm">
                                                {new Date(activity.data).toLocaleDateString("pt-BR")}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Outros tipos de atividade podem ser adicionados aqui */}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </RoleGuard>
    );
}