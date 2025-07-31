"use client";

import { useState } from 'react';

interface ToggleSwitchProps {
    label: string;
}

const ToggleSwitch = ({ label }: ToggleSwitchProps) => {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <div className="flex items-center justify-between bg-white border-2 border-gray-300 rounded-lg p-3">
            <label htmlFor="toggle" className="font-semibold text-gray-700 cursor-pointer">
                {label}
            </label>
            <div
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${isEnabled ? 'bg-cyan-600' : 'bg-gray-300'
                    }`}
            >
                <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </div>
        </div>
    );
};

export default ToggleSwitch;