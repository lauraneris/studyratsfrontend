"use client";

import { motion, Variants } from 'framer-motion';
import CustomSelect from "../../components/ui/CustomSelect";
import DifficultySlider from "../../components/ui/DifficultySlider";
import DisciplineSelector from "../../components/ui/DisciplineSelector";
import ToggleSwitch from "../../components/ui/ToggleSwitch";
import { Camera } from "lucide-react";
import ProfileIcon from "@/app/components/ui/ProfileIcon";
import MascotIntro from '@/app/components/ui/MascotIntro';
import { useAuth } from '@/app/context/AuthContext';

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

const SimuladoPage = () => {
    const { user } = useAuth();
    const title = "Gerar Simulado Personalizado";

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <header className="text-center mb-8">
                <p className="text-sm text-gray-500">Início / Simulado</p>
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
                    message="Vamos montar um simulado focado nos seus objetivos, {name}!"
                />
            </div>

            <motion.main
                className="max-w-xl mx-auto flex flex-col gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <CustomSelect label="Prova ou instituição" options={['ENEM', 'UFPR', 'UFSC', 'PUCPR', 'ACAFE', 'Outro']} />
                <DisciplineSelector />
                <textarea
                    placeholder="(Opcional) Digite os assuntos das disciplinas que deseja praticar...."
                    className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 h-24 focus:outline-none focus:border-brand-blue"
                />
                <ToggleSwitch label="Com gabarito e correção?" />
                <DifficultySlider />

                <div className="flex items-center gap-4 mt-4">
                    <button className="flex-1 bg-brand-blue text-white font-bold py-3 rounded-lg hover:brightness-110 transition-colors">
                        Gerar
                    </button>
                    <button className="flex-1 bg-brand-green text-white font-bold py-3 rounded-lg hover:brightness-110 transition-colors disabled:bg-gray-300" disabled>
                        Baixar
                    </button>
                </div>
            </motion.main>
        </div>
    );
};

export default SimuladoPage;