"use client";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FD1EAA] to-[#FF6CC7]" />
            <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(60rem 40rem at 40% 35%, rgba(255,255,255,.22), transparent 60%)" }} />
            <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1200px] grid-cols-1 place-items-center px-4 py-10">
                {children}
            </div>
        </div>
    );
}