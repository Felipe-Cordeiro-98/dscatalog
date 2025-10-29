import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function AdminProductCard({ id, name, price, imgUrl, category, onDelete }) {
    const formatted = formatCurrency(price);
    const [currencySymbol, value] = formatted.split(/\s+/);
    const [integer, decimal] = value.split(",");
    return (
        <div className="w-full min-w-[190px] md:h-[160px] md:flex p-3 md:p-0 bg-white rounded-[10px] shadow-[0px_0px_6px_#ccc]">
            <div className="w-full h-[170px] md:max-w-[150px] md:h-full border-b md:border-0 md:border-r border-[#E1E1E1]">
                <img className="w-full h-full object-contain" src={imgUrl} alt={name} />
            </div>
            <div className="md:w-full md:flex md:justify-between md:items-center md:mx-5">
                <div className="w-full h-[90px] md:h-full flex flex-col justify-between md:justify-evenly py-4">
                    <div className="">
                        <div className="text-center md:text-left">
                            <h3 className="text-base text-[#263238] font-bold truncate">{name}</h3>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <sup className="text-base text-[#9E9E9E] mr-1 mt-1">{currencySymbol}</sup>
                            <p className="text-2xl text-[#407BFF] font-bold leading-none">
                                {integer}
                                <span className="text-base">{"," + decimal}</span>
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <span className="w-[138px] h-[33px] flex justify-center items-center text-[#424242] font-semibold bg-[#C4C4C4] rounded-[10px]">
                            {category}
                        </span>
                    </div>
                </div>
                <div className="md:w-[190px] flex md:flex-col-reverse justify-center gap-3.5">
                    <button
                        className="w-full h-10 text-base text-[#DF5753] font-bold border border-[#DF5753] rounded-[10px] cursor-pointer"
                        type="button"
                        onClick={onDelete}
                    >
                        EXCLUIR
                    </button>
                    <Link
                        className="w-full h-10 flex justify-center items-center text-base text-[#9E9E9E] font-bold border border-[#E1E1E1] rounded-[10px] cursor-pointer"
                        to={`/admin/products/${id}/edit`}
                    >
                        EDITAR
                    </Link>
                </div>
            </div>
        </div>
    );
}
