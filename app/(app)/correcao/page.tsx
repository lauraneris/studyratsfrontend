"use client";

import { useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import InputOptionCard from "@/app/components/ui/InputOptionCard";
import MascotIntro from "@/app/components/ui/MascotIntro";
import AudioRecorder from "@/app/components/ui/AudioRecorder";
import { FileText, Type, Camera, Mic } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/app/context/AuthContext';

// Variantes de animação para o título
const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
};

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const CorrecaoPage = () => {
    const docInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);
    const { user, deductCoins } = useAuth();
    const title = "Correção com IA";

    const handleFileUpload = async (file: File) => {
        if (!file) return;

        const correctionCost = 50;
        if ((user?.stuartCoins ?? 0) < correctionCost) {
            alert("Você não tem StuartCoins suficientes para solicitar uma correção.");
            return;
        }

        const wantsToProceed = window.confirm(`Esta correção custará ${correctionCost} StuartCoins. Deseja continuar?`);
        if (!wantsToProceed) {
            return;
        }

        setIsLoading(true);
        deductCoins(correctionCost);

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

            if (!response.ok) {
                throw new Error('Falha no upload do arquivo.');
            }

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

            <header className="text-center mb-8">
                <p className="text-sm text-gray-500">Início / Correção</p>
                <motion.h1
                    className="text-4xl md:text-5xl font-black text-brand-pink mt-2"
                    variants={titleContainerVariants}
                    initial="hidden"
                    animate="visible"
                    aria-label={title}
                >
                    {title.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>
            </header>

            <div className="my-10">
                <MascotIntro
                    username={user?.username}
                    message="Pronto para ter sua redação corrigida, {name}? Escolha como quer enviá-la."
                />
            </div>

            <main className="max-w-4xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <InputOptionCard onClick={() => docInputRef.current?.click()} icon={isLoading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div> : <FileText size={40} />} title={isLoading ? "Enviando..." : "Envie um arquivo"} subtitle=".doc, .txt ou .pdf" />
                    <Link href="/correcao/digitar">
                        <InputOptionCard icon={<Type size={40} />} title="Digite seu texto" subtitle="" />
                    </Link>
                    <InputOptionCard onClick={() => imageInputRef.current?.click()} icon={<Camera size={40} />} title="Envie uma foto" subtitle=".jpg ou .png" />
                    <InputOptionCard onClick={() => setShowAudioModal(true)} icon={<Mic size={40} />} title="Envie um áudio" subtitle="" />
                </motion.div>
            </main>
        </div>
    );
};

export default CorrecaoPage;