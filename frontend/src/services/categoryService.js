import api from "./api";

const API_URL = '/categories';

export const getCategories = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export const getCategoryById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
};

export const createCategory = async (category) => {
    const response = await api.post(API_URL, category);
    return response.data;
};

export const updateCategory = async (id, category) => {
    const response = await api.put(`${API_URL}/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};