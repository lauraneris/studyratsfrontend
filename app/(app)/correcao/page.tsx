'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { api } from '@/lib/api';
import Alert from '@/app/components/ui/Alert';
import AudioRecorder from '@/app/components/ui/AudioRecorder'; // 1. Importar o novo componente
import {
    FileText,
    Upload,
    Camera,
    Mic,
    Send,
    Coins,
    Loader2,
} from 'lucide-react';

const CORRECTION_COST = 5;

export default function CorrecaoPage() {
    const [submissionType, setSubmissionType] = useState('texto');
    const [textContent, setTextContent] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, setUser } = useAuth();
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        }
    };

    // 2. Criar uma função para receber o áudio gravado do componente filho
    const handleAudioRecording = (audioFile: File) => {
        setFile(audioFile);
        if (audioFile) {
            setError(null);
        }
    }

    const handleSubmit = async () => {
        // ... (lógica de handleSubmit inalterada)
        if (submissionType === 'texto' && textContent.trim().length < 100) {
            setError("O texto da redação precisa ter pelo menos 100 caracteres.");
            return;
        }
        if (['arquivo', 'foto', 'audio'].includes(submissionType) && !file) {
            setError("Por favor, selecione ou grave um arquivo para enviar.");
            return;
        }
        if ((user?.profile?.stuart_coins_balance ?? 0) < CORRECTION_COST) {
            setError("Saldo de StuartCoins insuficiente para esta correção.");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData();
        if (submissionType === 'texto') {
            formData.append('submitted_text', textContent);
        } else if (file) {
            formData.append('submitted_file', file);
        }
        try {
            await api.post('/submissions/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (user && user.profile) {
                const updatedProfile = { ...user.profile, stuart_coins_balance: user.profile.stuart_coins_balance - CORRECTION_COST };
                setUser({ ...user, profile: updatedProfile });
            }
            router.push('/historico');
        } catch (err: any) {
            console.error("Erro ao enviar redação:", err);
            if (err.response?.status === 402) {
                setError("Pagamento necessário. Verifique o seu saldo de StuartCoins.");
            } else {
                setError("Ocorreu um erro ao enviar a sua redação. Por favor, tente novamente.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Hero Section (inalterada) */}
            <div className="bg-brand-blue neo-card p-8 mb-8 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 transform rotate-1">
                            CORREÇÃO<br />
                            <span className="text-brand-pink">AUTOMÁTICA!</span>
                        </h1>
                        <p className="text-lg text-white font-sans mb-4">
                            Envie a sua redação e receba um feedback detalhado com nota e dicas de melhoria!
                        </p>
                        <div className="flex items-center gap-2 bg-brand-green text-white px-4 py-2 neo-button font-black rounded-none w-fit">
                            <Coins className="w-5 h-5" />
                            <span>CUSTO: {CORRECTION_COST} STUARTCOINS</span>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center">
                        <Image
                            src="/imagens/stuartnerd.png"
                            alt="Stuart Nerd"
                            width={250}
                            height={250}
                            className="transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Formulário de Submissão */}
            <div className="bg-white neo-card p-8 space-y-8">
                {/* Tipo de Envio (inalterado) */}
                <div>
                    <label className="block text-xl font-black mb-3 text-brand-black">
                        1. COMO QUER ENVIAR?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { id: 'texto', icon: FileText, label: 'DIGITAR' },
                            { id: 'arquivo', icon: Upload, label: 'ARQUIVO' },
                            { id: 'foto', icon: Camera, label: 'FOTO' },
                            { id: 'audio', icon: Mic, label: 'ÁUDIO' },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => {
                                    setSubmissionType(type.id);
                                    setFile(null);
                                    setTextContent('');
                                }}
                                className={`p-4 neo-button font-black text-sm flex flex-col items-center justify-center gap-2 h-28 ${submissionType === type.id
                                    ? 'bg-brand-pink text-white'
                                    : 'bg-white text-brand-black hover:bg-gray-100'
                                    }`}
                            >
                                <type.icon className="w-6 h-6" />
                                <span>{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Input do Conteúdo ATUALIZADO */}
                <div>
                    <label className="block text-xl font-black mb-3 text-brand-black">2. ENVIE O CONTEÚDO</label>
                    {submissionType === 'texto' && (
                        <textarea
                            placeholder="Comece a escrever aqui..."
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            className="w-full min-h-[400px] border-4 border-brand-black p-4 text-lg font-sans resize-y"
                        />
                    )}
                    {['arquivo', 'foto'].includes(submissionType) && (
                        <div className="border-4 border-dashed border-brand-black p-8 text-center bg-gray-50">
                            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="bg-brand-blue text-white px-6 py-3 neo-button font-black cursor-pointer inline-block hover:bg-brand-pink">
                                ESCOLHER ARQUIVO
                            </label>
                            {file && (
                                <div className="mt-4 p-3 bg-white border-2 border-brand-black">
                                    <p className="font-black">{file.name}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {submissionType === 'audio' && (
                        <AudioRecorder onRecordingComplete={handleAudioRecording} />
                    )}
                </div>

                {/* Alerta e Botão de Envio (inalterados) */}
                {error && <Alert message={error} />}
                {!error && <Alert message={`A correção consome ${CORRECTION_COST} StuartCoins e pode levar alguns minutos. Você será notificado quando estiver pronta!`} />}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-brand-green text-white neo-button font-black text-xl py-6 hover:bg-brand-pink disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            A ENVIAR...
                        </>
                    ) : (
                        <>
                            <Send className="w-6 h-6" />
                            ENVIAR PARA CORREÇÃO
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}