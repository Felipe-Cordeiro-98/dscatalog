import { formatCurrency } from "../utils/formatCurrency";

export default function ProductCard({ imgUrl, name, price }) {
    const priceFormated = formatCurrency(price);
    return (
        <div className="h-[300px] flex flex-col items-center rounded-2xl shadow bg-white overflow-hidden">
            <div className="h-[180px] w-full flex items-center justify-center p-3 border-b-2 border-[#F2F2F2]">
                <img className="max-h-full max-w-full object-contain" src={imgUrl} alt={name} />
            </div>
            <div className="w-full h-[120px] flex flex-col justify-evenly p-3">
                <h3 className="text-[18px] text-center font-bold line-clamp-2">{name}</h3>
                <p className="flex justify-center text-gray-600">
                    <span className="text-base text-[#9E9E9E]">R$</span>
                    <span className="text-4xl font-bold text-blue-500 leading-none">
                        {priceFormated.replace("R$", "").split(",")[0]}
                    </span>
                    <span className="self-end mb-1 text-lg font-bold text-blue-500 leading-none">
                        ,{priceFormated.replace("R$", "").split(",")[1]}
                    </span>
                </p>
            </div>
        </div>
    );
}
