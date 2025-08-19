"use client";

import { useState } from 'react';
import { API_URL } from '@/lib/api';

const ConfiguracoesPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('As novas senhas não coincidem.');
            return;
        }

        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            setError('Você não está autenticado.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/change-password/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.old_password?.[0] || 'Ocorreu um erro.');
            }

            setMessage(data.message);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao alterar a senha.');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Configurações da Conta</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Alterar Senha</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-semibold">Senha Atual</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Nova Senha</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Confirmar Nova Senha</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-600 text-sm">{message}</p>}
                    <button
                        type="submit"
                        className="px-6 py-3 font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                    >
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfiguracoesPage;