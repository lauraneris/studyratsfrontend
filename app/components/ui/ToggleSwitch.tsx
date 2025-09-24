'use client';

interface ToggleSwitchProps {
    label: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

export default function ToggleSwitch({ label, enabled, onChange }: ToggleSwitchProps) {
    return (
        <div
            onClick={() => onChange(!enabled)}
            className="flex items-center justify-between cursor-pointer bg-gray-50 p-4 border-3 border-brand-black neo-button"
        >
            <span className="font-black text-brand-black">{label}</span>
            <div className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${enabled ? 'bg-brand-green' : 'bg-gray-300'}`}>
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-6' : ''}`} />
            </div>
        </div>
    );
}