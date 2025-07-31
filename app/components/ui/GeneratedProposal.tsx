interface GeneratedProposalProps {
    title: string;
    text: string;
}

const GeneratedProposal = ({ title, text }: GeneratedProposalProps) => {
    return (
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 h-full">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-600">Proposta personalizada:</h2>
                <button className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 transition-colors">
                    Começar
                </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 text-justify">{text}</p>
        </div>
    )
}

export default GeneratedProposal;