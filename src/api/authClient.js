import axios from "axios";

const authClient = axios.create({
  baseURL:
    "https://kappeauthserviceprovider-avevcya4hrd2ahb2.swedencentral-01.azurewebsites.net/api/",
});

authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authClient;
