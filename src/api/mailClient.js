import axios from "axios";

const mailClient = axios.create({
    baseURL: "https://mailhandlingservice-brdtfbcye5dea5cw.swedencentral-01.azurewebsites.net/api/",
});

mailClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default mailClient;