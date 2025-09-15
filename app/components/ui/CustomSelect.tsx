import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
    label: string;
    options: string[];
}

const CustomSelect = ({ label, options }: CustomSelectProps) => {
    return (
        <div className="relative w-full">
            <select
                className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-semibold focus:outline-none focus:border-brand-blue cursor-pointer"
                defaultValue=""
            >
                <option value="" disabled>{label}</option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <ChevronDown size={20} />
            </div>
        </div>
    );
};

export default CustomSelect;