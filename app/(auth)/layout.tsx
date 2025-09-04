import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Fundo principal: gradiente rosa/magenta */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-pink to-brand-pink/80" />

            {/* Spotlight radial atrás do form */}
            <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl md:left-1/3 md:top-1/2"
            />

            {/* Mascote Stuart com animação via Tailwind */}
            <div
                className={`absolute bottom-0 right-0 z-0 h-auto w-auto max-h-[80%] max-w-[50%] transform transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-24 translate-x-12"
                    }`}
            >
                <Image
                    src="/imagens/stuart.png"
                    alt="Mascote Study Rats com celular"
                    fill
                    sizes="(max-width: 1024px) 60vw, 50vw"
                    priority
                    className="pointer-events-none select-none object-contain object-right-bottom opacity-90 md:opacity-100"
                />
            </div>

            {/* Container do conteúdo */}
            <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 place-items-center px-4 md:grid-cols-2 md:px-8 lg:px-12">
                <div className="w-full max-w-md md:max-w-lg">{children}</div>
                <div className="hidden md:block" />
            </div>
        </div>
    );
}