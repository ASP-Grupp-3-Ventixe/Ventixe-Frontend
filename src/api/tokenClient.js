import axios from "axios";

const tokenClient = axios.create({
    baseURL: "https://tokenserviceprovider.onrender.com/api/Auth/token/",
});

tokenClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default tokenClient;