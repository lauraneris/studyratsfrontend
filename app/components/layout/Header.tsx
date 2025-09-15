"use client";

import ProfileIcon from "../ui/ProfileIcon";
import { useAuth } from "@/app/context/AuthContext";
import StuartCoin from "../icons/StuartCoinIcon";

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex justify-end items-center">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <StuartCoin className="h-9 w-9" />
                        <span className="font-bold text-lg text-gray-700">{user?.stuartCoins ?? 0}</span>
                    </div>

                    <ProfileIcon />
                </div>
            </div>
        </header>
    );
};

export default Header;