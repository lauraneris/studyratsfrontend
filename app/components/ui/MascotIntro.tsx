"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = { username?: string | null; message: string; bubbleColorClass?: string };

export default function MascotIntro({ username, message, bubbleColorClass = "bg-brand-blue" }: Props) {
    const formattedMessage = message.replace("{name}", username || "aluno(a)");
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-end gap-3">
            <Image src="/imagens/stuart.png" alt="Mascote Stuart" width={88} height={88} className="shrink-0 drop-shadow-md" />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.2 }}
                className={`relative p-3 rounded-2xl shadow-md text-white text-sm max-w-xs ${bubbleColorClass}`}
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,.1))" }}
            >
                {formattedMessage}
                <div
                    className={`absolute bottom-0 right-1/2 -mr-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] ${bubbleColorClass}`}
                    style={{ transform: "translateY(100%)", bottom: "-10px", right: "20px", left: "auto" }}
                />
            </motion.div>
        </motion.div>
    );
}