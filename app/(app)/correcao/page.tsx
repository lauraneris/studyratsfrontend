"use client";

import { useRef, useState } from 'react';
import InputOptionCard from "@/app/components/ui/InputOptionCard";
import MascotIntro from "@/app/components/ui/MascotIntro";
import AudioRecorder from "@/app/components/ui/AudioRecorder";
import { FileText, Type, Camera, Mic } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileIcon from '@/app/components/ui/ProfileIcon';
import { API_URL } from '@/lib/api';

const CorrecaoPage = () => {
    const docInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);

    const handleFileUpload = async (file: File) => {
        if (!file) return;
        setIsLoading(true);
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            alert('Você não está logado.');
            router.push('/login');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('submitted_file', file);

        try {
            const response = await fetch(`${API_URL}/api/submissions/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
                body: formData,
            });

            if (!response.ok) throw new Error('Falha no upload do arquivo.');

            alert('Arquivo enviado com sucesso para correção!');
            router.push('/historico');

        } catch (error) {
            alert(error instanceof Error ? error.message : "Ocorreu um erro.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAudioSend = (audioBlob: Blob) => {
        const audioFile = new File([audioBlob], "redacao_audio.webm", { type: "audio/webm" });
        handleFileUpload(audioFile);
        setShowAudioModal(false);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            {showAudioModal && <AudioRecorder onSend={handleAudioSend} onClose={() => setShowAudioModal(false)} />}

            <input type="file" ref={docInputRef} onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} className="hidden" accept=".doc,.docx,.txt,.pdf" />
            <input type="file" ref={imageInputRef} onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} className="hidden" accept="image/jpeg,image/png" capture="environment" />

            <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
                <div>
                    <p className="text-sm text-gray-500">Início / Correção</p>
                    <h1 className="text-4xl font-bold text-gray-800">Correção com IA</h1>
                </div>
                <ProfileIcon />

            </header>

            <main className="max-w-4xl mx-auto">
                <MascotIntro />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <InputOptionCard onClick={() => docInputRef.current?.click()} icon={isLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div> : <FileText size={40} />} title={isLoading ? "Enviando..." : "Envie um arquivo"} subtitle=".doc, .txt ou .pdf" />
                    <Link href="/correcao/digitar">
                        <InputOptionCard icon={<Type size={40} />} title="Digite seu texto" subtitle="" />
                    </Link>
                    <InputOptionCard onClick={() => imageInputRef.current?.click()} icon={<Camera size={40} />} title="Envie uma foto" subtitle=".jpg ou .png" />
                    <InputOptionCard onClick={() => setShowAudioModal(true)} icon={<Mic size={40} />} title="Envie um áudio" subtitle="" />
                </div>
            </main>
        </div>
    );
};

export default CorrecaoPage;