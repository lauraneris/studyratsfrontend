"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/api';

interface Correction {
    overall_score: number;
}

interface Submission {
    id: number;
    submission_date: string;
    status: string;
    correction: Correction | null;
}

const HistoryPage = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {

                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/history/`, {
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

    if (loading) return <p className="p-8">Carregando histórico...</p>;

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Meu Histórico</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                {submissions.length === 0 ? (
                    <p>Você ainda não enviou nenhuma redação.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {submissions.map(sub => (
                            <li key={sub.id} className="py-4">
                                <Link href={`/historico/${sub.id}`} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md">
                                    <div>
                                        <p className="font-semibold">Redação enviada em {new Date(sub.submission_date).toLocaleDateString('pt-BR')}</p>
                                        <p className={`text-sm font-bold ${sub.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-blue-600">{sub.correction?.overall_score ?? '--'}</p>
                                        <span className="text-sm text-gray-500">Ver detalhes</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;