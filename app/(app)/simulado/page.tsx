"use client";

import CustomSelect from "../../components/ui/CustomSelect";
import DifficultySlider from "../../components/ui/DifficultySlider";
import DisciplineSelector from "../../components/ui/DisciplineSelector";
import ToggleSwitch from "../../components/ui/ToggleSwitch";
import { Camera } from "lucide-react";
import ProfileIcon from "@/app/components/ui/ProfileIcon";

const SimuladoPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <header className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
                <div>
                    <p className="text-sm text-gray-500">Início / Simulado</p>
                    <h1 className="text-4xl font-bold text-gray-800">Gerar simulado personalizado</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                        <Camera size={20} />
                        Corrigir questão
                    </button>
                    <ProfileIcon />
                </div>
            </header>

            <main className="max-w-xl mx-auto flex flex-col gap-5">
                <CustomSelect label="Prova ou instituição" options={['ENEM', 'UFPR', 'UFSC', 'PUCPR', 'ACAFE', 'Outro']} />
                <DisciplineSelector />
                <textarea
                    placeholder="(Opcional) Digite os assuntos das disciplinas que deseja praticar...."
                    className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 h-24 focus:outline-none focus:border-cyan-500"
                />
                <ToggleSwitch label="Com gabarito e correção?" />
                <DifficultySlider />

                <div className="flex items-center gap-4 mt-4">
                    <button className="flex-1 bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                        Gerar
                    </button>
                    <button className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300" disabled>
                        Baixar
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SimuladoPage;