interface CorrectionHeaderProps {
    submissionDate: string;
    wordCount: number;
}

const CorrectionHeader = ({ submissionDate, wordCount }: CorrectionHeaderProps) => {
    return (
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span>Data de envio: {submissionDate}</span>
            <span>Número de palavras: {wordCount}</span>
        </div>
    );
};

export default CorrectionHeader;