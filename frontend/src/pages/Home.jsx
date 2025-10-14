import HomeIllustration from "../assets/home-illustration.svg";
import ArrowButton from "../components/ArrowButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-[calc(100dvh-148px)] lg:h-[calc(100vh-148px)] flex flex-col lg:flex-row-reverse justify-center lg:items-center bg-white rounded-[20px] shadow-2xl overflow-hidden">
            <div className="w-full lg:w-1/2 h-full flex justify-center">
                <img
                    className="w-full max-w-[600px] h-full object-contain"
                    src={HomeIllustration}
                    alt="Mulher no escritório"
                />
            </div>
            <div className="w-full lg:w-1/2 lg:flex lg:flex-col lg:items-center p-5">
                <div className="mb-5 md:mb-11 text-center lg:text-left">
                    <h1 className="mb-2 md:mb-5 text-2xl md:text-[42px] text-[#263238] font-bold">
                        Conheça o melhor <br /> catálogo de produtos
                    </h1>
                    <p className="text-[#9E9E9E] text-base md:text-2xl">
                        Ajudaremos você a encontrar os <br className="md:hidden" /> melhores
                        <br className="hidden md:block" />
                        produtos disponíveis <br className="md:hidden" /> no mercado.
                    </p>
                </div>

                <div className="w-full flex justify-center lg:mb-5">
                    <ArrowButton text="INICIE AGORA A SUA BUSCA" onClick={() => navigate("/catalog")} />
                </div>
            </div>
        </div>
    );
}
