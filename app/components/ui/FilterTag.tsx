interface FilterTagProps {
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

const FilterTag = ({ label, isActive = false, onClick }: FilterTagProps) => {
    const baseClasses = "px-5 py-2 rounded-full font-semibold text-sm cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink";
    const activeClasses = "bg-brand-pink text-white";
    const inactiveClasses = "bg-white text-gray-700 border border-gray-200 hover:bg-brand-pink/10 hover:text-brand-pink hover:border-brand-pink/30";

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