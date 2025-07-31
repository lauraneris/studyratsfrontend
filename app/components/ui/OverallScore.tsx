interface OverallScoreProps {
    score: number;
}

const OverallScore = ({ score }: OverallScoreProps) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Nota geral</span>
                <span className="text-3xl font-bold text-blue-600">{score}</span>
            </div>
        </div>
    );
};

export default OverallScore;