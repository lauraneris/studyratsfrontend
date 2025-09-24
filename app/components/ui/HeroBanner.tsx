'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function HeroBanner() {
    return (
        <div className="mb-12">
            <div className="bg-brand-pink neo-card p-8 md:p-12 mb-8 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 transform -rotate-1">
                            EXPLORE NOSSOS
                            <br />
                            <span className="text-brand-blue">TEMAS!</span>
                        </h1>
                        <p className="text-lg text-white mb-6 font-sans">
                            Pratique com temas reais de vestibular e melhore as suas notas com o Stuart!
                        </p>
                        <Link href="/gerar">
                            <button className="bg-brand-green text-white neo-button font-black text-lg px-8 py-4 hover:bg-brand-blue flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                GERAR PROPOSTA
                            </button>
                        </Link>
                    </div>
                    <div className="hidden md:flex justify-center">
                        <Image
                            src="/imagens/paginaprincipal.png"
                            alt="Stuart - Mascote Study Rats"
                            width={350}
                            height={350}
                            className="transform rotate-3 group-hover:rotate-0 transition-transform duration-300"
                            priority
                        />
                    </div>
                </div>

                {/* Elementos Decorativos */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-blue rounded-full transform rotate-45 opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-green transform rotate-12 opacity-80"></div>
            </div>
        </div>
    );
}