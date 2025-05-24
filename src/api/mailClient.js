import axios from "axios";

const mailClient = axios.create({
    baseURL: import.meta.env.VITE_MAIL_HANDLING_SERVICE_URL + "/api/",
});

mailClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default mailClient;