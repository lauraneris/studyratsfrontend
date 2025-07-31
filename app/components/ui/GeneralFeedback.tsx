interface GeneralFeedbackProps {
    comment: string;
    positivePoints: string[];
}

const GeneralFeedback = ({ comment, positivePoints }: GeneralFeedbackProps) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 text-gray-700">
            <h3 className="font-bold mb-2 text-gray-800">Comentário geral</h3>
            <p className="text-sm mb-4">{comment}</p>

            <h4 className="font-bold text-gray-800">**Pontos Positivos:**</h4>
            <ul className="list-none space-y-1 mt-2">
                {positivePoints.map((point, index) => (
                    <li key={index} className="text-sm">- {point}</li>
                ))}
            </ul>
        </div>
    );
};

export default GeneralFeedback;