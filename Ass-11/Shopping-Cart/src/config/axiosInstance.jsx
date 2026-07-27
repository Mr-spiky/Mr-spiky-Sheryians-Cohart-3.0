import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
