import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../../services/productService";
import AdminProductCard from "../../../components/AdminProductCard";

import { HttpStatusCode } from "axios";
import { useDebounce } from "../../../hooks/useDebounce";
import AdminSearchBar from "../../../components/AdminSearchBar";

export default function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const { debounced } = useDebounce(search);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = debounced.trim().length > 1 ? { search: debounced } : {};

                const response = await getProducts(params);
                setProducts(response.data.content ?? []);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, [debounced]);

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
        <div className="w-full p-5 overflow-y-auto lg:h-[calc(100dvh-108px)]">
            <AdminSearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar Produto"
                linkAddTo="/admin/products/create"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
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
