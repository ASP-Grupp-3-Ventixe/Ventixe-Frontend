import axios from "axios";

const accountClient = axios.create({
    baseURL: import.meta.env.VITE_ACCOUNT_SERVICE_URL + "/api/",
});

accountClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default accountClient;