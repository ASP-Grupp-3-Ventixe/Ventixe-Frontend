const isDev = window.location.hostname === "localhost";

const config = {
  apiBaseUrl: isDev
    ? "http://localhost:7101"
    : "https://eventservice-rk6f.onrender.com",
};

export default config;
