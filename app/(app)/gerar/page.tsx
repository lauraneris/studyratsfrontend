'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Zap, Loader2, ClipboardCopy } from 'lucide-react';
import Alert from '@/app/components/ui/Alert';


interface GeneratedProposal {
    title: string;
    axis: string;
    sourceTexts: { url: string; description: string }[];
}


const mockProposal: GeneratedProposal = {
    title: "Desafios da valorização do trabalho voluntário no Brasil",
    axis: "Social / Cidadania",
    sourceTexts: [
        { url: "https://www.wfp.org/stories/10-facts-about-volunteering", description: "Fatos e números sobre o impacto global do voluntariado." },
        { url: "https://www.gov.br/pt-br/noticias/assistencia-social/2023/08/dia-nacional-do-voluntariado", description: "Artigo do governo brasileiro sobre a importância do trabalho voluntário." },
        { url: "https://data.worldbank.org/indicator/NV.AGR.EMPL.ZS", description: "Dados sobre a força de trabalho e o setor de serviços no Brasil." }
    ]
};


export default function GerarPropostaPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [proposal, setProposal] = useState<GeneratedProposal | null>(null);
    const [error, setError] = useState('');

    const handleGenerate = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setProposal(null);

        // Simula uma chamada de API
        setTimeout(() => {
            setProposal(mockProposal);
            setIsLoading(false);
        }, 2000);
    };

    const handleCopy = () => {
        if (proposal) {
            const textToCopy = `
        Título: ${proposal.title}
        Eixo Temático: ${proposal.axis}
        Textos de Apoio:
        ${proposal.sourceTexts.map(st => `- ${st.description}: ${st.url}`).join('\n')}
        `;
            navigator.clipboard.writeText(textToCopy.trim());
            alert('Proposta copiada para a área de transferência!');
        }
    };


    return (
        <div>
            {/* Formulário de Geração */}
            <div className="bg-white neo-card p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <Zap className="w-10 h-10 text-brand-blue" />
                    <h1 className="text-3xl font-black text-brand-black">Gerador de Propostas</h1>
                </div>
                <p className="font-sans text-gray-600 mb-6">
                    Selecione os parâmetros abaixo para gerar uma proposta de redação inédita com base nos seus interesses. Cada geração tem um custo de <strong>2 StuartCoins</strong>.
                </p>

                <form onSubmit={handleGenerate} className="grid md:grid-cols-3 gap-6">
                    {/* Parâmetros (versão simplificada por agora) */}
                    <div>
                        <label className="font-black text-brand-black">Eixo Temático</label>
                        <select className="mt-1 w-full border-3 border-brand-black h-12 px-3 font-sans bg-white">
                            <option>Social</option>
                            <option>Meio Ambiente</option>
                            <option>Tecnologia</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-black text-brand-black">Instituição</label>
                        <select className="mt-1 w-full border-3 border-brand-black h-12 px-3 font-sans bg-white">
                            <option>ENEM</option>
                            <option>FUVEST</option>
                            <option>UNICAMP</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-black text-brand-black">Nível de Dificuldade</label>
                        <select className="mt-1 w-full border-3 border-brand-black h-12 px-3 font-sans bg-white">
                            <option>Fácil</option>
                            <option>Médio</option>
                            <option>Difícil</option>
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <button type="submit" disabled={isLoading} className="w-full bg-brand-green text-white neo-button font-black text-xl py-4 hover:bg-brand-pink disabled:opacity-50 flex items-center justify-center gap-3">
                            {isLoading ? <><Loader2 className="w-6 h-6 animate-spin" /> GERANDO...</> : 'GERAR PROPOSTA'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Resultado da Geração */}
            {isLoading && (
                <div className="text-center p-12">
                    <Image src="/imagens/stuart.png" alt="Stuart" width={128} height={128} className="mx-auto animate-bounce" />
                    <p className="font-black text-2xl mt-4">Nossa IA está a preparar uma proposta incrível para si...</p>
                </div>
            )}

            {proposal && (
                <div className="bg-white neo-card animate-fade-in-up">
                    <div className="p-6 border-b-4 border-brand-black flex justify-between items-center">
                        <h2 className="text-2xl font-black text-brand-black">Sua Proposta Inédita!</h2>
                        <button onClick={handleCopy} className="neo-button bg-white p-2 hover:bg-gray-100 flex items-center gap-2 text-sm font-black">
                            <ClipboardCopy className="w-4 h-4" />
                            COPIAR
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <h3 className="font-black text-brand-blue">TÍTULO</h3>
                            <p className="font-sans text-lg">{proposal.title}</p>
                        </div>
                        <div>
                            <h3 className="font-black text-brand-pink">EIXO TEMÁTICO</h3>
                            <p className="font-sans text-lg">{proposal.axis}</p>
                        </div>
                        <div>
                            <h3 className="font-black text-brand-green">TEXTOS DE APOIO</h3>
                            <ul className="list-disc list-inside font-sans space-y-2 mt-2">
                                {proposal.sourceTexts.map((text, index) => (
                                    <li key={index}>
                                        {text.description} <a href={text.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Ler mais]</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {error && <Alert message={error} />}
        </div>
    );
}