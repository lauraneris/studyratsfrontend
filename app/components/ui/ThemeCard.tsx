import Image from 'next/image';
import { Star, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

interface ThemeCardProps {
    id: number;
    imageUrl: string;
    title: string;
    status: 'pending' | 'completed';
}

const ThemeCard = ({ id, imageUrl, title, status }: ThemeCardProps) => {
    const destinationUrl = status === 'pending' ? `/escrever/${id}` : `/historico/${id}`;

    return (
        <Link href={destinationUrl} className="block h-full">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col border border-gray-200">
                <div className="relative">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-500 hover:text-yellow-400 hover:bg-white transition-colors">
                        <Star size={18} />
                    </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">

                    <h3 className="font-black text-gray-800 mb-2 flex-grow text-lg">{title}</h3>

                    {/* INÍCIO DA ALTERAÇÃO */}
                    {status === 'pending' ? (
                        <div className="flex items-center justify-between text-brand-green font-black group-hover:underline mt-auto">
                            <span>Escrever Redação</span>
                            <ArrowRight size={20} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between text-brand-green font-bold mt-auto">
                            <span>Ver Correção</span>
                            <Check size={20} />
                        </div>
                    )}
                    {/* FIM DA ALTERAÇÃO */}
                </div>
            </div>
        </Link>
    );
};

export default ThemeCard;