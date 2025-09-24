'use client';

import { useState, FormEvent, useMemo, ChangeEvent } from 'react';
import { BookOpen, Zap, Loader2, Download } from 'lucide-react';
import ToggleSwitch from '@/app/components/ui/ToggleSwitch';

const allDisciplines = [
    'Matemática', 'Física', 'Química', 'Biologia',
    'História', 'Geografia', 'Filosofia', 'Sociologia',
    'Língua Portuguesa', 'Literatura', 'Inglês'
];

type SelectedDiscipline = { name: string; questions: number };

export default function GerarSimuladoPage() {
    const [selectedDisciplines, setSelectedDisciplines] = useState<SelectedDiscipline[]>([]);
    const [difficulty, setDifficulty] = useState<'facil' | 'medio' | 'dificil'>('medio');
    const [includeGabarito, setIncludeGabarito] = useState(true);
    const [includeCorrecao, setIncludeCorrecao] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false); // Novo estado para controlar se o simulado foi gerado

    const resetGeneration = () => setIsGenerated(false);

    const toggleDiscipline = (disciplineName: string) => {
        resetGeneration();
        const isSelected = selectedDisciplines.some(d => d.name === disciplineName);
        if (isSelected) {
            setSelectedDisciplines(prev => prev.filter(d => d.name !== disciplineName));
        } else {
            setSelectedDisciplines(prev => [...prev, { name: disciplineName, questions: 5 }]);
        }
    };

    const updateQuestionCount = (disciplineName: string, e: ChangeEvent<HTMLInputElement>) => {
        resetGeneration();
        let newCount = parseInt(e.target.value, 10);
        if (isNaN(newCount)) newCount = 1;

        // Garante que o valor está entre 1 e 30
        newCount = Math.max(1, Math.min(30, newCount));

        setSelectedDisciplines(prev => prev.map(d =>
            d.name === disciplineName ? { ...d, questions: newCount } : d
        ));
    };

    const totalQuestions = useMemo(() => {
        return selectedDisciplines.reduce((total, d) => total + d.questions, 0);
    }, [selectedDisciplines]);

    const handleGenerate = (e: FormEvent) => {
        e.preventDefault();
        if (selectedDisciplines.length === 0) {
            alert('Selecione pelo menos uma disciplina!');
            return;
        }
        setIsLoading(true);
        setIsGenerated(false);

        setTimeout(() => {
            setIsLoading(false);
            setIsGenerated(true); // Ativa o botão de download
            alert(`Simulado de ${totalQuestions} questões gerado com sucesso!`);
        }, 2500);
    };

    const handleDownload = () => {
        if (!isGenerated) return;
        // Lógica de download (simulada)
        alert("A iniciar o download do seu simulado em PDF...");
        console.log("Download solicitado para:", {
            disciplinas: selectedDisciplines,
            dificuldade: difficulty,
            total: totalQuestions,
            gabarito: includeGabarito,
            correcao: includeCorrecao
        });
    };

    return (
        <div>
            <div className="bg-white neo-card p-8">
                <div className="flex items-center gap-4 mb-6">
                    <BookOpen className="w-10 h-10 text-brand-green" />
                    <h1 className="text-3xl font-black text-brand-black">Gerador de Simulados</h1>
                </div>
                <p className="font-sans text-gray-600 mb-8">
                    Crie simulados personalizados para testar os seus conhecimentos. Selecione as disciplinas, o número de questões e comece a praticar!
                </p>

                <form onSubmit={handleGenerate} className="space-y-8">
                    {/* 1. Seleção de Disciplinas */}
                    <div>
                        <h2 className="text-xl font-black mb-4 text-brand-black">1. SELECIONE AS DISCIPLINAS</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {allDisciplines.map(discipline => (
                                <button
                                    type="button" key={discipline} onClick={() => toggleDiscipline(discipline)}
                                    className={`p-4 neo-button font-black text-sm h-full ${selectedDisciplines.some(d => d.name === discipline) ? 'bg-brand-pink text-white' : 'bg-white text-brand-black hover:bg-gray-100'}`}
                                >
                                    {discipline}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quantidade de Questões por Disciplina */}
                    {selectedDisciplines.length > 0 && (
                        <div>
                            <h2 className="text-xl font-black mb-4 text-brand-black">2. AJUSTE O NÚMERO DE QUESTÕES</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedDisciplines.map(d => (
                                    <div key={d.name} className="flex items-center justify-between bg-gray-50 p-3 border-3 border-brand-black">
                                        <label htmlFor={`questions-${d.name}`} className="font-black">{d.name}</label>
                                        <input
                                            id={`questions-${d.name}`}
                                            type="number"
                                            min="1"
                                            max="30"
                                            value={d.questions}
                                            onChange={(e) => updateQuestionCount(d.name, e)}
                                            className="w-20 h-10 text-center font-black border-2 border-brand-black"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-right font-black text-lg">TOTAL DE QUESTÕES: {totalQuestions}</div>
                        </div>
                    )}

                    {/* 3. Configurações Adicionais */}
                    <div>
                        <h2 className="text-xl font-black mb-4 text-brand-black">3. CONFIGURAÇÕES ADICIONAIS</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <ToggleSwitch label="Incluir Gabarito" enabled={includeGabarito} onChange={(val) => { setIncludeGabarito(val); resetGeneration(); }} />
                            <ToggleSwitch label="Incluir Correção" enabled={includeCorrecao} onChange={(val) => { setIncludeCorrecao(val); resetGeneration(); }} />
                            <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value as any); resetGeneration(); }} className="w-full border-3 border-brand-black h-full px-3 font-black text-brand-black bg-white">
                                <option value="facil">Nível Fácil</option>
                                <option value="medio">Nível Médio</option>
                                <option value="dificil">Nível Difícil</option>
                            </select>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button type="submit" disabled={isLoading} className="w-full bg-brand-blue text-white neo-button font-black text-xl py-4 hover:bg-brand-pink disabled:opacity-50 flex items-center justify-center gap-3">
                            {isLoading ? <><Loader2 className="w-6 h-6 animate-spin" /> GERANDO...</> : <><Zap className="w-6 h-6" /> GERAR SIMULADO</>}
                        </button>
                        <button type="button" onClick={handleDownload} disabled={!isGenerated || isLoading} className="w-full bg-brand-green text-white neo-button font-black text-xl py-4 hover:bg-brand-pink disabled:opacity-50 disabled:bg-gray-400 disabled:shadow-none disabled:translate-y-[4px] flex items-center justify-center gap-3">
                            <Download className="w-6 h-6" />
                            BAIXAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}