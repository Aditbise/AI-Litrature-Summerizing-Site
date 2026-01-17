

import axios from "axios";
import { BASE_URL} from "./apiPaths";

const getBaseURL = () => {
    if (import.meta.env.PROD) {
        return import.meta.env.VITE_API_BASE_URL || "https://your-backend-name.onrender.com";
    }
    return BASE_URL;
};

const axiosInstance = axios.create({
    baseURL: getBaseURL(), 
    timeout: 30000, 
    headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {  
            config.headers.Authorization = `Bearer ${accessToken}`; 
        }
        return config; 
    }, 
    (error) => { 
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
