"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { BookCheck, Target, Award } from 'lucide-react';

interface Correction {
    overall_score: number;
}

interface Submission {
    id: number;
    submission_date: string;
    status: string;
    correction: Correction | null;
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const PerfilPage = () => {
    const { user } = useAuth();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) return;

            try {
                const response = await fetch('http://localhost:8000/api/history/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                if (!response.ok) throw new Error('Falha ao buscar histórico.');
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const totalSubmissions = submissions.length;
    const completedSubmissions = submissions.filter(s => s.status === 'completed' && s.correction);
    const averageScore = completedSubmissions.length > 0
        ? Math.round(completedSubmissions.reduce((acc, sub) => acc + (sub.correction?.overall_score || 0), 0) / completedSubmissions.length)
        : 0;

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800">Meu Perfil</h1>
            <p className="text-lg text-gray-600 mt-1">Bem-vindo(a) de volta, {user?.username || 'Aluno(a)'}!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<BookCheck size={24} />} label="Redações Enviadas" value={totalSubmissions} />
                <StatCard icon={<Target size={24} />} label="Nota Média" value={averageScore} />
                <StatCard icon={<Award size={24} />} label="Redações Concluídas" value={completedSubmissions.length} />
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Atividade Recente</h2>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    {loading ? (
                        <p>Carregando...</p>
                    ) : submissions.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {submissions.slice(0, 5).map(sub => (
                                <li key={sub.id} className="py-3">
                                    <Link href={`/historico/${sub.id}`} className="flex justify-between items-center group">
                                        <div>
                                            <p className="font-semibold group-hover:text-blue-600">Redação enviada em {new Date(sub.submission_date).toLocaleDateString('pt-BR')}</p>
                                            <p className="text-sm text-gray-500">{sub.status}</p>
                                        </div>
                                        <span className="font-bold text-lg text-gray-800">{sub.correction?.overall_score ?? '--'}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nenhuma atividade recente.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerfilPage;