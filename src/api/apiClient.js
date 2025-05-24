import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5241";

const apiClient = axios.create({
  baseURL: apiUrl + "/api/",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
