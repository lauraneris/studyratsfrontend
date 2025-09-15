"use client";

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface CriteriaCardProps {
    criteriaNumber: number;
    score: number;
    maxScore: number;
    content: string;
    isPerfect: boolean;
}

const CriteriaCard = ({ criteriaNumber, score, maxScore, content, isPerfect }: CriteriaCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-800">
                    Critério {String(criteriaNumber).padStart(2, '0')} ({score}/{maxScore})
                </span>
                <div className="flex items-center gap-2">
                    {isPerfect && <Check className="text-brand-green" size={20} />}
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100">
                    <p className="mt-2">{content}</p>
                </div>
            )}
        </div>
    );
};

export default CriteriaCard;