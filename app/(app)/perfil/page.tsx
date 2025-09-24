'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { API_URL } from '@/lib/api';
import { Award, TrendingUp, KeyRound, UserCircle, LogOut } from 'lucide-react';
import { api } from '@/lib/api';


interface Submission {
    id: number;
    submission_date: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    correction: { overall_score: number } | null;
}

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('As novas palavras-passe não coincidem.');
            setIsError(true);
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            await api.put('/change-password/', {
                old_password: oldPassword,
                new_password: newPassword,
            });
            setMessage('Palavra-passe alterada com sucesso!');
            setIsError(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setMessage(error.response?.data?.old_password?.[0] || 'Ocorreu um erro ao alterar a palavra-passe.');
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="font-black text-brand-black">Palavra-passe Atual</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="mt-1 w-full border-3 border-brand-black h-12 px-4 font-sans" />
            </div>
            <div>
                <label className="font-black text-brand-black">Nova Palavra-passe</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 w-full border-3 border-brand-black h-12 px-4 font-sans" />
            </div>
            <div>
                <label className="font-black text-brand-black">Confirmar Nova Palavra-passe</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 w-full border-3 border-brand-black h-12 px-4 font-sans" />
            </div>
            {message && <p className={`text-sm font-bold ${isError ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-brand-pink text-white neo-button font-black text-lg py-3 hover:bg-brand-blue disabled:opacity-50">
                {isLoading ? 'A alterar...' : 'Alterar Palavra-passe'}
            </button>
        </form>
    );
};


export default function PerfilPage() {
    const { user, logout } = useAuth();
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/history/');
                setSubmissions(response.data);
            } catch (error) {
                console.error("Erro ao carregar histórico:", error);
            }
        };
        fetchHistory();
    }, []);

    const stats = useMemo(() => {
        const completed = submissions.filter(s => s.status === 'completed' && s.correction);
        const scores = completed.map(s => s.correction!.overall_score);
        const media = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        return { total: submissions.length, media };
    }, [submissions]);

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna Principal: Informações e Ações */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white neo-card p-6 flex items-center gap-4">
                    <UserCircle className="w-16 h-16 text-brand-blue" />
                    <div>
                        <h2 className="text-3xl font-black">{user?.username}</h2>
                        <p className="font-sans text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <div className="bg-white neo-card">
                    <div className="p-6 border-b-4 border-brand-black">
                        <h2 className="text-2xl font-black flex items-center gap-2">
                            <KeyRound className="w-6 h-6 text-brand-pink" />
                            Segurança da Conta
                        </h2>
                    </div>
                    <div className="p-6">
                        <ChangePasswordForm />
                    </div>
                </div>
                <button onClick={logout} className="w-full bg-red-500 text-white neo-button font-black text-lg py-4 hover:bg-red-600 flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5" />
                    Terminar Sessão
                </button>
            </div>

            {/* Coluna Lateral: Estatísticas e Atividade */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white neo-card">
                    <div className="p-4 border-b-4 border-brand-black">
                        <h3 className="text-xl font-black flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Estatísticas
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center bg-gray-50 p-3 border-2 border-brand-black">
                            <span className="font-black">Total de Redações</span>
                            <span className="font-black text-2xl text-brand-blue">{stats.total}</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 p-3 border-2 border-brand-black">
                            <span className="font-black">Nota Média</span>
                            <span className="font-black text-2xl text-brand-green">{stats.media.toFixed(0)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white neo-card">
                    <div className="p-4 border-b-4 border-brand-black">
                        <h3 className="text-xl font-black flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-brand-green" />
                            Atividade Recente
                        </h3>
                    </div>
                    <div className="p-4 space-y-2">
                        {submissions.slice(0, 5).map(sub => (
                            <div key={sub.id} className="text-sm p-2 border-b border-gray-200">
                                <span className="font-black">Redação enviada:</span>
                                <span className="font-sans ml-2 text-gray-600">{new Date(sub.submission_date).toLocaleString('pt-BR')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}