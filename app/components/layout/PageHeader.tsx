'use client';
import Image from 'next/image';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    mascotMessage: string;
}

const PageHeader = ({ title, subtitle, mascotMessage }: PageHeaderProps) => {
    return (
        <header className="bg-brand-blue text-white pt-8 pb-20 px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black">{title}</h1>
                    <p className="text-lg font-light mt-1">{subtitle}</p>
                </div>
                <div className="relative flex items-end gap-4">
                    {/* Balão de Fala */}
                    <div className="relative hidden lg:block">
                        <div className="bg-white text-gray-800 p-4 rounded-xl shadow-lg">
                            <p className="font-semibold text-base">{mascotMessage}</p>
                        </div>
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-0 h-0
                               border-t-[10px] border-t-transparent
                               border-l-[15px] border-l-white
                               border-b-[10px] border-b-transparent"
                        />
                    </div>
                    {/* Mascote */}
                    <div className="relative flex-shrink-0 w-40 h-40">
                        <Image
                            src="/imagens/stuartnerd.png"
                            alt="Mascote Study Rats"
                            width={200}
                            height={200}
                            className="absolute bottom-[-75px] right-0"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PageHeader;