import Image from 'next/image';
import { Star, ArrowRight, Check } from 'lucide-react';

interface ThemeCardProps {
    imageUrl: string;
    title: string;
    status: 'pending' | 'completed';
}

const ThemeCard = ({ imageUrl, title, status }: ThemeCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-transform hover:-translate-y-1 h-full flex flex-col">
            <div className="relative">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover"
                />
                <button className="absolute top-3 right-3 p-1.5 bg-white/70 rounded-full text-gray-500 hover:text-yellow-500 hover:bg-white transition-colors">
                    <Star size={18} />
                </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 mb-2 flex-grow">{title}</h3>
                {status === 'pending' ? (
                    <div className="flex items-center justify-between text-blue-600 font-bold group-hover:underline mt-auto">
                        <span>Iniciar</span>
                        <ArrowRight size={20} />
                    </div>
                ) : (
                    <div className="flex items-center justify-between text-green-600 font-bold mt-auto">
                        <span>Ver corrigido</span>
                        <Check size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeCard;