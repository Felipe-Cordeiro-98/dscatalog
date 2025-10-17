import { Link } from "react-router-dom";
import searchIcon from "../assets/search-icon.svg";

export default function AdminSearchBar({ value, onChange, placeholder, linkAddTo }) {
    return (
        <div className="w-full flex flex-col md:flex-row md:items-center gap-5 mb-5">
            {/* link add */}
            <Link
                className="w-full md:max-w-[200px] h-[50px] flex justify-center items-center text-white font-bold bg-[#407BFF] rounded-lg cursor-pointer hover:opacity-95"
                to={linkAddTo}
            >
                ADICIONAR
            </Link>
            
            {/* input search */}
            <div className="w-full h-[70px] md:h-[50px] flex items-center relative px-5 bg-white rounded-lg shadow-[0px_4px_20px_#00000040]">
                <input
                    className="w-full h-[40px] pr-7 border-b border-[#E1E1E1] outline-none placeholder:text-[#9E9E9E]"
                    placeholder={placeholder}
                    type="text"
                    onChange={onChange}
                    value={value}
                />
                <img
                    className="absolute top-4 right-3 md:top-1"
                    src={searchIcon}
                    alt="Pesquisa"
                />
            </div>
        </div>
    );
}
