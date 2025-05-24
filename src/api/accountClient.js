import axios from "axios";

const accountClient = axios.create({
    baseURL: "https://kappeaccountserviceprovider-fpc6habrbpckg8ha.swedencentral-01.azurewebsites.net/api/",
});

accountClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default accountClient;