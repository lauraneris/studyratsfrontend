"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Search, Plus } from "lucide-react";
import ProfileIcon from "../ui/ProfileIcon";
import { useAuth } from "@/app/context/AuthContext";
import StuartCoinIcon from "../icons/StuartCoinIcon";

const titleContainerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const letterVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

export default function TemasHeader() {
    const { user } = useAuth();
    const title = "Explore Nossos Temas";
    return (
        <header className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center gap-4 sm:gap-6">
                    <motion.h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-pink mr-auto leading-tight" variants={titleContainerVariants} initial="hidden" animate="visible" aria-label={title}>
                        {title.split("").map((c, i) => (
                            <motion.span key={i} variants={letterVariants} style={{ display: "inline-block" }}>
                                {c === " " ? "\u00A0" : c}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <Link href="/gerar" className="hidden md:inline-flex items-center gap-2 h-10 px-4 bg-brand-pink text-white font-bold rounded-lg hover:brightness-110 transition-all active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink">
                        <Plus size={18} /> <span>Gerar Proposta</span>
                    </Link>

                    <div className="relative hidden sm:block">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Buscar por título..." className="h-10 pl-9 pr-3 w-56 md:w-72 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink" />
                    </div>

                    <div className="flex items-center gap-2 bg-white h-10 px-3 rounded-lg border border-gray-200">
                        <StuartCoinIcon className="h-6 w-6 md:h-7 md:w-7" />
                        <span className="font-bold text-gray-700 text-base md:text-lg">{user?.stuartCoins ?? 0}</span>
                    </div>

                    <ProfileIcon />
                </div>
            </div>
        </header>
    );
}