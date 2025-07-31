interface FilterTagProps {
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

const FilterTag = ({ label, isActive = false, onClick }: FilterTagProps) => {
    const baseClasses = "px-5 py-2 rounded-full font-semibold text-sm cursor-pointer transition-colors";
    const activeClasses = "bg-gray-800 text-white";
    const inactiveClasses = "bg-white text-gray-700 border border-gray-200 hover:bg-gray-200";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {label}
        </button>
    );
};

export default FilterTag;