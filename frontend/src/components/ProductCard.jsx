import { formatCurrency } from "../utils/formatCurrency";

export default function ProductCard({ name, price, imgUrl, onClick }) {
    const formatted = formatCurrency(price);
    const [currencySymbol, value] = formatted.split(/\s+/);
    const [integer, decimal] = value.split(",");

    return (
        <div
            className="w-full h-[260px] bg-white rounded-[10px] shadow-[0px_0px_6px_#ccc] transition-transform duration-300 hover:scale-[103%] cursor-pointer"
            onClick={onClick}
        >
            <div className="w-full h-[170px] p-3 border-b border-[#E1E1E1]">
                <img className="w-full h-full object-contain" src={imgUrl} alt={name} />
            </div>
            <div className="w-full h-[90px] flex flex-col justify-between py-4">
                <div className="text-center">
                    <h3 className="text-base text-[#263238] font-bold">{name}</h3>
                </div>
                <div className="flex justify-center items-start">
                    <sup className="text-base text-[#9E9E9E] mr-1 mt-1">{currencySymbol}</sup>
                    <p className="text-[24px] text-[#407BFF] font-bold leading-none">
                        {integer}
                        <span className="text-base">{"," + decimal}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
