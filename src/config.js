const isDev = window.location.hostname === "localhost";
const config = {
  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:5103',
  eventServiceUrl: import.meta.env.VITE_EVENT_SERVICE_URL || 'http://localhost:7101',
  accountServiceUrl: import.meta.env.VITE_ACCOUNT_SERVICE_URL || 'http://localhost:5177',
  tokenServiceUrl: import.meta.env.VITE_TOKEN_SERVICE_URL || 'http://localhost:7111',
  mailHandlingServiceUrl: import.meta.env.VITE_MAIL_HANDLING_SERVICE_URL || 'http://localhost:8080',
};

export default config;