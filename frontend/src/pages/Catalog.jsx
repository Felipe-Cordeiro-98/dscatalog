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
                const params = debouncedSearch.trim().length > 1 
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
        <div className="w-full h-full">
            <div className="mb-5 md:mb-10 lg:flex lg:items-center">
                {/* title */}
                <div className="mb-4">
                    <h1 className="lg:mr-10 text-[18px] md:text-2xl lg:text-nowrap text-[#263238] font-bold">
                        Catálogo de produtos
                    </h1>
                </div>

                {/* filters */}
                <div className="w-full md:flex pt-4 pb-6 px-4 md:py-[10px] bg-white rounded-[10px] shadow">
                    <div className="w-full mb-5 md:mb-0 md:mr-5 relative">
                        <input
                            className="w-full h-10 pr-10 border-b border-[#E1E1E1] placeholder:text-[#9E9E9E] focus:outline-none"
                            placeholder={`Pesquisar ${filterType === "product" ? "produto" : "categoria"}`}
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                        />
                        <img className="absolute top-0 right-0" src={searchIcon} alt="Pesquisa" />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="w-full mr-4">
                            <select
                                className="w-full md:min-w-[200px] h-10 text-[#9E9E9E] border-b border-[#E1E1E1] focus:outline-none"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="product">Filtrar por Produto</option>
                                <option value="category">Filtrar por Categoria</option>
                            </select>
                        </div>
                        <div>
                            <button
                                className="
                                    w-[110px] md:w-[180px] h-10 
                                    text-[12px] md:text-base text-[#9E9E9E] font-bold 
                                    border border-[#E1E1E1] 
                                    rounded-[10px] 
                                    cursor-pointer hover:shadow-[0px_0px_2px_#407BFF] 
                                    transition-transform duration-200 active:scale-[0.98]
                                "
                                onClick={clearFilters}
                                type="button"
                            >
                                LIMPAR FILTRO
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* catalog */}
            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {products.map((prod) => (
                    <ProductCard
                        key={prod.id}
                        id={prod.id}
                        name={prod.name}
                        price={prod.price}
                        imgUrl={prod.imgUrl}
                        onClick={() => navigate(`/catalog/${prod.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
