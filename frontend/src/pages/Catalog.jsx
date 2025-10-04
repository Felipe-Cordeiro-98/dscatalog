import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import searchIcon from "../assets/search-icon.svg";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("product");
    const [products, setProducts] = useState([]);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = debouncedSearch.trim().length > 0
                ? { search: debouncedSearch, filterType }
                : {};
                
                const response = await getProducts(params);
                setProducts(response.content ?? []);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, [debouncedSearch, filterType]);

    const clearFilters = () => {
        setSearch("");
        setDebouncedSearch("");
        setFilterType("product");
    };

    return (
        <div className="">
            <div className="lg:flex lg:items-center">
                {/* page title */}
                <div className="mb-4 md:mr-5 lg:mb-0">
                    <h3 className="text-[#263238] text-[18px] md:text-2xl text-nowrap font-bold">
                        Catálogo de produtos
                    </h3>
                </div>
                {/* search with filters */}
                <div className="w-full md:flex md:items-center p-4 lg:p-0 lg:px-4 lg:py-2 bg-white rounded-xl shadow">
                    {/* input */}
                    <div className="md:w-1/2 mb-5 md:m-0 relative">
                        <input
                            className="w-full h-10 pl-1 pr-9 border-b border-[#E1E1E1] placeholder:text-[#9E9E9E] focus:outline-none"
                            type="text"
                            placeholder={filterType === "product" ? "Pesquisar Produto" : "Pesquisar Categoria"}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <img className="absolute top-0 right-0" src={searchIcon} alt="Search" />
                    </div>
                    {/* select and button */}
                    <div className="md:w-1/2 flex justify-between md:ml-10">
                        <select
                            className="md:w-full h-10 md:mr-5 text-[#9E9E9E] border-b border-[#E1E1E1] focus:outline-none"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="product">Filtrar por Produto</option>
                            <option value="category">Filtrar por Categoria</option>
                        </select>
                        <button
                            className="h-10 text-[#9E9E9E] text-[12px] text-nowrap font-bold px-4 border border-[#E1E1E1] rounded-xl cursor-pointer transition-transform duration-150 active:scale-95"
                            onClick={clearFilters}
                            type="button"
                        >
                            LIMPAR FILTRO
                        </button>
                    </div>
                </div>
            </div>
            {/* products */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {products.map((prod) => (
                    <div
                        key={prod.id}
                        className="shadow-[0px_0px_8px_rgba(0,0,0,0.1)] rounded-2xl cursor-pointer transition-transform duration-300 delay-75 hover:scale-105 "
                        onClick={() => navigate(`/catalog/${prod.id}`)}
                    >
                        <ProductCard name={prod.name} price={prod.price} imgUrl={prod.imgUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
}
