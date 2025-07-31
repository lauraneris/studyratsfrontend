"use client";

import { useState, useRef } from 'react';
import { Mic, StopCircle, Send, X, AudioLines } from 'lucide-react';

interface AudioRecorderProps {
    onSend: (audioBlob: Blob) => void;
    onClose: () => void;
}

const AudioRecorder = ({ onSend, onClose }: AudioRecorderProps) => {
    const [permission, setPermission] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const getMicrophonePermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermission(true);
            return stream;
        } catch (err) {
            alert("Permissão para o microfone negada.");
            return null;
        }
    };

    const startRecording = async () => {
        const stream = await getMicrophonePermission();
        if (stream) {
            setIsRecording(true);
            setAudioBlob(null);
            audioChunksRef.current = [];
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
            };
            mediaRecorder.start();
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSend = () => {
        if (audioBlob) {
            onSend(audioBlob);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <X size={24} />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Gravador de Áudio</h2>
                    {!isRecording && !audioBlob && (
                        <button onClick={startRecording} className="bg-red-500 text-white p-6 rounded-full hover:bg-red-600 transition-colors">
                            <Mic size={40} />
                        </button>
                    )}
                    {isRecording && (
                        <>
                            <button onClick={stopRecording} className="bg-gray-700 text-white p-6 rounded-full hover:bg-gray-800 transition-colors">
                                <StopCircle size={40} />
                            </button>
                            <p className="text-gray-500 mt-4 animate-pulse">Gravando...</p>
                        </>
                    )}
                    {audioBlob && !isRecording && (
                        <div className="flex flex-col items-center gap-4">
                            <AudioLines size={40} className="text-green-500" />
                            <p className="font-semibold text-green-600">Gravação Concluída</p>
                            <button onClick={handleSend} className="w-full flex items-center justify-center gap-2 mt-4 px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700">
                                <Send size={20} />
                                Enviar Áudio
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioRecorder;