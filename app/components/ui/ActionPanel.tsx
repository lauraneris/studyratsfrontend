import { ArrowRight } from 'lucide-react';

const ActionPanel = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-8">
            <a href="#" className="flex justify-between items-center py-4 border-b border-gray-200 hover:text-blue-600 transition-colors">
                <span className="font-semibold">Proposta e instruções</span>
                <ArrowRight size={20} />
            </a>
            <button className="w-full mt-6 bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                Começar redação
            </button>
        </div>
    );
};

export default ActionPanel;