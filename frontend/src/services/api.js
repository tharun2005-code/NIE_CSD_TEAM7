import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const loginAdmin = async (username, password) => {
    try {
        const response = await api.post("/login", { username, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};

