interface PromptDetailsProps {
    title: string;
    motivationalText: string;
}

const PromptDetails = ({ title, motivationalText }: PromptDetailsProps) => {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-6">Início / Escrever</p>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Escrever Redação</h1>

            <div className="space-y-6 text-gray-700">
                <div>
                    <h2 className="text-sm font-bold uppercase text-gray-500">Tema</h2>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {title}
                    </p>
                </div>

                <div className="prose max-w-none text-justify">
                    <p>{motivationalText}</p>
                </div>
            </div>
        </div>
    );
};

export default PromptDetails;