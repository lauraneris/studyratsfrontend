import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface EssayContentProps {
    theme: string;
    text: string;
}

const EssayContent = ({ theme, text }: EssayContentProps) => {
    return (
        <div>
            <Link href="/historico" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft size={16} />
                Voltar
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Sua redação</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{theme}</h2>
            <div className="prose max-w-none text-justify text-gray-700 whitespace-pre-wrap">
                {text}
            </div>
            <button className="mt-8 bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors">
                Reescrever
            </button>
        </div>
    );
};

export default EssayContent;