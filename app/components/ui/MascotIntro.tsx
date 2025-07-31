import Image from "next/image";

const MascotIntro = () => {
    return (
        <div className="flex justify-start items-center my-12">
            <div className="relative flex-shrink-0">
                <Image
                    src="/imagens/redabot.png"
                    alt="Mascote RedaBot"
                    width={150}
                    height={150}
                />
            </div>
            <div className="relative ml-[-15px]">
                <div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg">
                    <p className="font-semibold text-base">
                        Eu sou o RedaBot, seu corretor inteligente. Escolha uma opção para me enviar o texto.
                    </p>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-0 h-0
          border-t-[10px] border-t-transparent
          border-r-[15px] border-r-blue-500
          border-b-[10px] border-b-transparent">
                </div>
            </div>
        </div>
    );
}

export default MascotIntro;