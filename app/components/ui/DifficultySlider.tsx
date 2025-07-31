const DifficultySlider = () => {
    return (
        <div className="w-full">
            <label className="font-semibold text-gray-700 mb-2 block">Nível de Dificuldade</label>
            <input type="range" min="1" max="3" defaultValue="2" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Fácil</span>
                <span>Médio</span>
                <span>Difícil</span>
            </div>
        </div>
    );
};

export default DifficultySlider;