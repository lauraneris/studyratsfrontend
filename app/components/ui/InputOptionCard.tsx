import React from 'react';

interface InputOptionCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

const InputOptionCard = ({ icon, title, subtitle, onClick }: InputOptionCardProps) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center text-center p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-cyan-500 hover:shadow-lg transition-all duration-300 h-48"
        >
            <div className="text-gray-700 mb-3">
                {icon}
            </div>
            <p className="font-bold text-gray-800">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </button>
    );
};

export default InputOptionCard;