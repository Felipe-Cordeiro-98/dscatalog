import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col lg:flex-row-reverse justify-center lg:items-center bg-white rounded-2xl overflow-auto md:overflow-hidden">
            <div className="w-full lg:w-1/2 flex justify-center mb-9">
                <img className="max-w-full h-auto rounded-2xl" src="./src/assets/home-illustration.svg" alt="" />
            </div>
            <div className="w-full lg:w-1/2 lg:h-full lg:flex lg:flex-col lg:justify-around mb-10 lg:m-0 lg:pl-10">
                <div className="w-full mb-8">
                    <h1 className="mb-3 text-[#263238] text-3xl md:text-[42px] text-center lg:text-left font-bold">
                        Conheça o melhor <br /> catálogo de produtos
                    </h1>
                    <p className="text-[#9E9E9E] text-base md:text-2xl text-center lg:text-left">
                        Ajudaremos você a encontrar os <br /> melhores produtos disponíveis <br /> no mercado.
                    </p>
                </div>
                <div className="w-full flex justify-center lg:justify-start">
                    <button
                        className="h-12 px-9 text-white text-base md:text-xl font-bold bg-[#407BFF] rounded-xl cursor-pointer hover:opacity-85 transition-all duration-300"
                        onClick={() => navigate("/catalog")}
                        type="button"
                    >
                        INICIE AGORA A SUA BUSCA
                    </button>
                </div>
            </div>
        </div>
    );
}
