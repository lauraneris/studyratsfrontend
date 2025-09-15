"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';

const DigitarPage = () => {
    const [text, setText] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const router = useRouter();

    const handleSubmit = async () => {
        setStatus('loading');
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            alert('Você não está logado. Por favor, faça o login para continuar.');
            router.push('/login');
            setStatus('error');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/submissions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ submitted_text: text }),
            });

            if (!response.ok) {
                throw new Error('Falha no envio. Tente novamente mais tarde.');
            }

            setStatus('success');
            alert('Redação enviada com sucesso para correção!');
            router.push('/historico');

        } catch (error) {
            setStatus('error');
            alert(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-black text-brand-pink mb-2">Digite sua redação</h1>
            <p className="text-gray-600 mb-6">Cole seu texto abaixo ou digite diretamente no campo para enviá-lo para correção.</p>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-96 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                placeholder="Comece a escrever aqui..."
            />

            <button
                onClick={handleSubmit}
                disabled={status === 'loading' || text.length < 50}
                className="mt-4 px-8 py-3 bg-brand-blue text-white font-bold rounded-lg hover:brightness-110 transition-all active:scale-[.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? 'Enviando...' : 'Enviar para Correção'}
            </button>
        </div>
    );
};

export default DigitarPage;