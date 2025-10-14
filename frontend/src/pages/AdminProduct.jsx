import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";
import AdminProductCard from "../components/AdminProductCard";

import searchIcon from "../assets/search-icon.svg";
import { HttpStatusCode } from "axios";

export default function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = debouncedSearch.trim().length > 1 ? { search: debouncedSearch } : {};

                const response = await getProducts(params);
                setProducts(response.data.content ?? []);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, [debouncedSearch]);

    const handleDeleteProduct = async (id) => {
        try {
            const response = await deleteProduct(id);
            if (response.status === HttpStatusCode.NoContent) {
                setProducts((prev) => prev.filter((prod) => prod.id !== id));
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <div
            className="
                w-full p-5 overflow-y-auto
                lg:h-[calc(100dvh-108px)]
            "
        >
            <div
                className="
                    w-full flex flex-col gap-5 mb-5
                    md:flex-row md:items-center
                "
            >
                {/* link add product */}
                <Link
                    className="
                        w-full h-[50px] flex justify-center items-center text-white font-bold bg-[#407BFF] rounded-lg cursor-pointer hover:opacity-95
                        md:max-w-[200px]
                    "
                    to="/admin/products/create"
                >
                    ADICIONAR
                </Link>
                {/* input search */}
                <div
                    className="
                        w-full h-[70px] flex items-center relative px-5 bg-white rounded-lg shadow-[0px_4px_20px_#00000040]
                        md:h-[50px]
                    "
                >
                    <input
                        className="w-full h-[40px] pr-7 border-b border-[#E1E1E1] outline-none placeholder:text-[#9E9E9E]"
                        placeholder="Nome do produto"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <img
                        className="
                            absolute top-4 right-3
                            md:top-1
                        "
                        src={searchIcon}
                        alt="Pesquisa"
                    />
                </div>
            </div>

            {/* product card */}
            <div
                className="
                    grid grid-cols-1 gap-4
                    md:grid-cols-3
                    xl:grid-cols-4
                "
            >
                {products.map((prod) => (
                    <AdminProductCard
                        key={prod.id}
                        id={prod.id}
                        name={prod.name}
                        price={prod.price}
                        imgUrl={prod.imgUrl}
                        onDelete={() => handleDeleteProduct(prod.id)}
                    />
                ))}
            </div>
        </div>
    );
}
