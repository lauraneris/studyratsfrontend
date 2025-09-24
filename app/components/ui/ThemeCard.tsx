import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';

interface ThemeCardProps {
    id: number;
    title: string;
    category: string;
    motivationalText: string;
}

const categoryColors: { [key: string]: string } = {
    social: 'bg-brand-pink text-white',
    politica: 'bg-brand-blue text-white',
    economia: 'bg-brand-green text-white',
    'meio ambiente': 'bg-purple-600 text-white',
    tecnologia: 'bg-orange-600 text-white',
    educacao: 'bg-yellow-500 text-brand-black',
    cultura: 'bg-red-600 text-white',
    default: 'bg-gray-700 text-white',
};

export default function ThemeCard({ id, title, category, motivationalText }: ThemeCardProps) {
    const colorClass = categoryColors[category.toLowerCase()] || categoryColors.default;

    return (
        <Link href={`/escrever/${id}`} className="group block">
            <div className="bg-white neo-card p-6 h-full flex flex-col hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 text-xs font-black ${colorClass} neo-button`}>
                        {category.toUpperCase()}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-pink transition-colors" />
                </div>

                <h3 className="text-xl font-black mb-3 text-brand-black line-clamp-2 flex-grow">
                    {title}
                </h3>

                <p className="text-gray-600 font-sans mb-4 line-clamp-3 text-sm">
                    {motivationalText}
                </p>

                <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-sans font-semibold text-gray-700">60 min</span>
                    </div>
                    <div className="font-black text-brand-blue">ENEM 2023</div>
                </div>
            </div>
        </Link>
    );
}