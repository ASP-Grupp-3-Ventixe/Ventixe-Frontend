import axios from "axios";

const tokenClient = axios.create({
    baseURL: import.meta.env.VITE_TOKEN_SERVICE_URL + "/",
});

tokenClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default tokenClient;