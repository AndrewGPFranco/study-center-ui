import axios from "axios";

export const createAxiosInstance = () => {
    return axios.create({baseURL: import.meta.env.VITE_API_URL});
};