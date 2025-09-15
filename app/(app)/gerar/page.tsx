"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import CustomSelect from '../../components/ui/CustomSelect';
import DifficultySlider from '../../components/ui/DifficultySlider';
import GeneratedProposal from '../../components/ui/GeneratedProposal';
import MascotIntro from '@/app/components/ui/MascotIntro';
import { useAuth } from '@/app/context/AuthContext';

// Variantes de animação (podemos futuramente mover para um arquivo compartilhado)
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

const mockData = {
    title: "A necessidade de discussão a cerca do autismo no Brasil",
    text: "Na série \"Euforia\", a personagem Rue usa os entorpecentes como forma de fuga de seus problemas familiares e pessoais, porém, esse uso se torna um vício. De maneira análoga, essa realidade se faz presente no contexto brasileiro, visto que diversos jovens e adultos utilizam essas substâncias a fim de adquirir prazer e felicidade. Nesse sentido, é notório a negligência estatal e a lacuna educacional como principais agravantes do empecilho.\n\nSob esse viés, é válido ressaltar que há uma ausência de políticas públicas por parte do governo para mitigar a problemática. Desse modo, o artigo 196 da Constituição Federal de 1988 promulga que é dever do Estado garantir a saúde da população. Entretanto, ao não promover as políticas públicas, o dever do Estado de garantir o bem estar da sociedade não é exercido, motivo o qual leva a uma contribuição para o aumento da taxa de usuários de alucinógenos."
};

const GerarPage = () => {
    const [proposal, setProposal] = useState<{ title: string; text: string; } | null>(null);
    const { user } = useAuth();
    const title = "Gerar Proposta Personalizada";

    const handleGenerate = () => {
        setProposal(mockData);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <header className="text-center mb-8">
                <p className="text-sm text-gray-500">Início / Gerar</p>
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
                    message="Vamos criar uma proposta de redação perfeita para você, {name}!"
                />
            </div>

            <main className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-12 items-start">
                <motion.div
                    className="flex flex-col gap-6 p-8 bg-white rounded-2xl border-2 border-gray-200 h-fit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <CustomSelect label="Tema da Redação" options={['Saúde', 'Educação', 'Segurança']} />
                    <CustomSelect label="Prova ou instituição" options={['ENEM', 'UFPR', 'PUCPR', 'Outro']} />
                    <CustomSelect label="Qual habilidade deseja treinar" options={['Coesão', 'Coerência', 'Competência 1 (ENEM)']} />
                    <DifficultySlider />
                    <button onClick={handleGenerate} className="w-full mt-4 bg-brand-blue text-white font-bold py-3 rounded-lg hover:brightness-110 transition-colors">
                        Gerar proposta
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {proposal ? (
                        <GeneratedProposal title={proposal.title} text={proposal.text} />
                    ) : (
                        <div className="flex items-center justify-center bg-white p-8 rounded-2xl border-2 border-dashed border-gray-300 h-full min-h-[400px]">
                            <p className="text-gray-500 text-center">Sua proposta personalizada aparecerá aqui!</p>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default GerarPage;