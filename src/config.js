const isDev = window.location.hostname === "localhost";
const config = {
  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL,
  eventServiceUrl: import.meta.env.VITE_EVENT_SERVICE_URL,
  accountServiceUrl: import.meta.env.VITE_ACCOUNT_SERVICE_URL,
  tokenServiceUrl: import.meta.env.VITE_TOKEN_SERVICE_URL,
  mailHandlingServiceUrl: import.meta.env.VITE_MAIL_HANDLING_SERVICE_URL,
};
  console.log("redeploy check:", import.meta.env.VITE_AUTH_SERVICE_URL);

export default config;