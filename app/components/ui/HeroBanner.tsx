"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroBannerProps {
    src: string; // /imagens/paginaprincipal.(webp|png|avif)
    alt: string;
    objectPosition?: string;
}

export default function HeroBanner({ src, alt, objectPosition = "center" }: HeroBannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full overflow-hidden rounded-2xl shadow-lg"
        >
            <div className="relative aspect-[16/6] sm:aspect-[16/6] md:aspect-[21/7] lg:aspect-[24/7]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1280px) 1120px, (min-width: 1024px) 928px, (min-width: 768px) 672px, 100vw"
                    className="object-cover"
                    style={{ objectPosition }}
                    quality={90}
                    priority
                />
            </div>
        </motion.div>
    );
}