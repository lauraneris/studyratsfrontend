'use client';

import { useState, useRef } from 'react';
import { Mic, StopCircle, Play, Trash2 } from 'lucide-react';

interface AudioRecorderProps {
    onRecordingComplete: (audioFile: File) => void;
}

export default function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordingStatus, setRecordingStatus] = useState<'inactive' | 'recording'>('inactive');
    const [audio, setAudio] = useState<string | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const getMicrophonePermission = async () => {
        if ('MediaRecorder' in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                setPermission(true);
                setStream(streamData);
            } catch (err: any) {
                alert(err.message);
            }
        } else {
            alert('A API MediaRecorder não é suportada no seu navegador.');
        }
    };

    const startRecording = async () => {
        if (!permission || !stream) {
            await getMicrophonePermission();
            return; // A permissão será pedida, o utilizador clica novamente
        }

        setRecordingStatus('recording');
        const media = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorder.current = media;
        mediaRecorder.current.start();

        audioChunks.current = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            audioChunks.current.push(event.data);
        };
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            setRecordingStatus('inactive');
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);

                // Converte o Blob para um File e envia para o componente pai
                const audioFile = new File([audioBlob], `gravacao-${Date.now()}.webm`, { type: 'audio/webm' });
                onRecordingComplete(audioFile);

                audioChunks.current = [];
            };
        }
    };

    const resetRecording = () => {
        setAudio(null);
        onRecordingComplete(null as any); // Informa o pai que o áudio foi removido
    }

    return (
        <div className="border-4 border-dashed border-brand-black p-8 text-center bg-gray-50">
            {!audio && (
                <>
                    <Mic className={`w-12 h-12 mx-auto mb-4 ${recordingStatus === 'recording' ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />

                    {!permission ? (
                        <button onClick={getMicrophonePermission} className="bg-brand-blue text-white px-6 py-3 neo-button font-black">
                            PERMITIR MICROFONE
                        </button>
                    ) : recordingStatus === 'inactive' ? (
                        <button onClick={startRecording} className="bg-brand-green text-white px-6 py-3 neo-button font-black">
                            INICIAR GRAVAÇÃO
                        </button>
                    ) : (
                        <button onClick={stopRecording} className="bg-red-500 text-white px-6 py-3 neo-button font-black">
                            PARAR GRAVAÇÃO
                        </button>
                    )}
                    <p className="mt-4 text-gray-600 font-regular">
                        {recordingStatus === 'recording' ? 'Gravando...' : 'Clique para iniciar a gravação de áudio.'}
                    </p>
                </>
            )}

            {audio && (
                <div className="flex flex-col items-center gap-4">
                    <audio src={audio} controls className="w-full"></audio>
                    <button onClick={resetRecording} className="bg-brand-pink text-white px-6 py-3 neo-button font-black flex items-center gap-2">
                        <Trash2 className="w-5 h-5" />
                        GRAVAR NOVAMENTE
                    </button>
                </div>
            )}
        </div>
    );
}