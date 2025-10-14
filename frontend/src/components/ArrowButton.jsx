import Arrow from "../assets/Arrow.png";

export default function ArrowButton({ text, onClick }) {
    return (
        <button
            className="w-full max-w-[450px] h-[50px] md:h-[60px] flex justify-between items-center text-white font-bold bg-[#407BFF] rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 active:scale-[0.99]"
            onClick={onClick}
            type="button"
        >
            <div className="w-full text-center text-base md:text-2xl select-none">{text}</div>
            <div className="w-[50px] min-w-[50px] h-full flex justify-center items-center bg-[#33579C]">
                <img src={Arrow} alt="Seta" />
            </div>
        </button>
    );
}
