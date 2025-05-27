export function attachInterceptors(client) {
    client.interceptors.request.use(config => {
        const token = localStorage.getItem('accessToken');
        console.log('Interceptor: accessToken from localStorage:', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Interceptor: request headers:', config.headers);
        return config;
    });
}