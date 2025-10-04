import api from "./api";

const API_URL = "/products";

export const getProducts = async ({ search = "", filterType = "product" } = {}) => {
    const params = {};

    if (filterType === "product" && search) params.name = search;
    if (filterType === "category" && search) params.category = search;

    const response = await api.get(API_URL, { params });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await api.post(API_URL, product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await api.put(`${API_URL}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};
