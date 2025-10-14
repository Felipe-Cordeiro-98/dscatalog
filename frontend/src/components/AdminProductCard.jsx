import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function AdminProductCard({ id, name, price, imgUrl, onDelete }) {
    const formatted = formatCurrency(price);
    const [currencySymbol, value] = formatted.split(/\s+/);
    const [integer, decimal] = value.split(",");
    return (
        <div className="w-full min-w-[190px] p-3 bg-white rounded-[10px] shadow-[0px_0px_6px_#ccc]">
            <div className="w-full h-[170px]  border-b border-[#E1E1E1]">
                <img className="w-full h-full object-contain" src={imgUrl} alt={name} />
            </div>
            <div className="w-full h-[90px] flex flex-col justify-between py-4">
                <div className="text-center">
                    <h3 className="text-base text-[#263238] font-bold truncate">{name}</h3>
                </div>
                <div className="flex justify-center">
                    <sup className="text-base text-[#9E9E9E] mr-1 mt-1">{currencySymbol}</sup>
                    <p className="text-2xl text-[#407BFF] font-bold leading-none">
                        {integer}
                        <span className="text-base">{"," + decimal}</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-center gap-3.5">
                <button
                    className="max-w-[165px] w-full h-10 text-base text-[#DF5753] font-bold border border-[#DF5753] rounded-[10px] cursor-pointer"
                    type="button"
                    onClick={onDelete}
                >
                    EXCLUIR
                </button>
                <Link
                    className="max-w-[165px] w-full h-10 flex justify-center items-center text-base text-[#9E9E9E] font-bold border border-[#E1E1E1] rounded-[10px] cursor-pointer"
                    to={`/admin/products/${id}/edit`}
                >
                    EDITAR
                </Link>
            </div>
        </div>
    );
}
