const isDev = window.location.hostname === "localhost";

const config = {
  // authServiceUrl: isDev
  //     ? "http://localhost:5103"  // AuthServiceProvider port
  //     : "https://",
  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL,

  // EventService - din befintliga event API
  // eventServiceUrl: isDev
  //     ? "http://localhost:7101"
  //     : "https://",
  eventServiceUrl: import.meta.env.VITE_EVENT_SERVICE_URL,

  // Direct access till andra services om behövs
  // accountServiceUrl: isDev
  //     ? "http://localhost:5177"  // AccountServiceProvider port
  //     : "https://",
  accountServiceUrl: import.meta.env.VITE_ACCOUNT_SERVICE_URL,

  // tokenServiceUrl: isDev
  //     ? "http://localhost:7111"   // TokenServiceProvider port
  //     : "https://",
  tokenServiceUrl: import.meta.env.VITE_TOKEN_SERVICE_URL,
};

export default config;
