"use client";

import { useState } from 'react';
import CustomSelect from '../../components/ui/CustomSelect';
import DifficultySlider from '../../components/ui/DifficultySlider';
import GeneratedProposal from '../../components/ui/GeneratedProposal';

const mockData = {
    title: "A necessidade de discussão a cerca do autismo no Brasil",
    text: "Na série \"Euforia\", a personagem Rue usa os entorpecentes como forma de fuga de seus problemas familiares e pessoais, porém, esse uso se torna um vício. De maneira análoga, essa realidade se faz presente no contexto brasileiro, visto que diversos jovens e adultos utilizam essas substâncias a fim de adquirir prazer e felicidade. Nesse sentido, é notório a negligência estatal e a lacuna educacional como principais agravantes do empecilho.\n\nSob esse viés, é válido ressaltar que há uma ausência de políticas públicas por parte do governo para mitigar a problemática. Desse modo, o artigo 196 da Constituição Federal de 1988 promulga que é dever do Estado garantir a saúde da população. Entretanto, ao não promover as políticas públicas, o dever do Estado de garantir o bem estar da sociedade não é exercido, motivo o qual leva a uma contribuição para o aumento da taxa de usuários de alucinógenos."
};

const GerarPage = () => {
    const [proposal, setProposal] = useState<{ title: string; text: string; } | null>(null);

    const handleGenerate = () => {
        setProposal(mockData);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <header className="mb-10 max-w-7xl mx-auto">
                <p className="text-sm text-gray-500">Início / Gerar</p>
                <h1 className="text-4xl font-bold text-gray-800">Gerar proposta personalizada</h1>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-12">
                <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl border-2 border-gray-200 h-fit">
                    <CustomSelect label="Tema da Redação" options={['Saúde', 'Educação', 'Segurança']} />
                    <CustomSelect label="Prova ou instituição" options={['ENEM', 'UFPR', 'PUCPR', 'Outro']} />
                    <CustomSelect label="Qual habilidade deseja treinar" options={['Coesão', 'Coerência', 'Competência 1 (ENEM)']} />
                    <DifficultySlider />
                    <button onClick={handleGenerate} className="w-full mt-4 bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                        Gerar proposta
                    </button>
                </div>

                <div>
                    {proposal ? (
                        <GeneratedProposal title={proposal.title} text={proposal.text} />
                    ) : (
                        <div className="flex items-center justify-center bg-white p-8 rounded-2xl border-2 border-dashed border-gray-300 h-full">
                            <p className="text-gray-500 text-center">Sua proposta personalizada aparecerá aqui após você preencher os campos e clicar em "Gerar proposta".</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default GerarPage;