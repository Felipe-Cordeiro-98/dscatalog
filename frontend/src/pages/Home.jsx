export default function Home() {
    return (
        <div className="w-full h-full p-5 md:p-10 shadow-2xl rounded-2xl bg-white">
            <div className="w-full h-full flex flex-col lg:flex-row-reverse justify-evenly lg:items-center">
                {/* image */}
                <div className="w-full">
                    <img className="w-full md:max-w-[600px]" src="src/assets/homepage-picture.png" alt="" />
                </div>

                <div className="w-full">
                    {/* text */}
                    <div className="w-full">
                        <h2 className="mb-3.5 text-2xl md:text-4xl text-center lg:text-left font-bold">
                            Conheça o melhor <br /> catálogo de produtos
                        </h2>
                        <p className="mb-8 text-base md:text-2xl text-center lg:text-left text-[#9E9E9E]">
                            Ajudaremos você a encontrar os <br className="md:hidden" /> melhores{" "}
                            <br className="hidden md:block" /> produtos disponíveis <br className="md:hidden" /> no
                            mercado.
                        </p>
                    </div>

                    {/* button */}
                    <div className="w-full flex justify-center lg:justify-start">
                        <button className="w-full md:w-[450px] h-[50px] text-white font-bold rounded-2xl bg-[#407BFF] cursor-pointer hover:opacity-85 transition-all duration-300">
                            INICIE AGORA A SUA BUSCA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
