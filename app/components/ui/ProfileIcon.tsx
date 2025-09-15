"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import StuartCoin from "../icons/StuartCoinIcon";
import ProfileDropdown from "./ProfileDropdown";

const ProfileIcon = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="h-11 w-11 rounded-full overflow-hidden border-2 border-gray-200 hover:border-brand-pink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/50"
                aria-label="Abrir menu do perfil"
            >
                {/* Evita blur em telas retina: serve 2x e escala via CSS */}
                <Image
                    src="/imagens/profileicon.png"
                    alt="Ícone do Perfil"
                    width={88}
                    height={88}
                    quality={100}
                    className="h-11 w-11 object-cover"
                    priority={false}
                />
            </button>

            {isDropdownOpen && <ProfileDropdown />}
        </div>
    );
};

export default ProfileIcon;