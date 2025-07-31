"use client";

import { useState, useRef, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

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
            <button onClick={() => setIsDropdownOpen(prev => !prev)}>
                <UserCircle size={40} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </button>
            {isDropdownOpen && <ProfileDropdown />}
        </div>
    );
};

export default ProfileIcon;