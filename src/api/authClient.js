import axios from "axios";

const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_SERVICE_URL + "/api/",
});

authClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default authClient;