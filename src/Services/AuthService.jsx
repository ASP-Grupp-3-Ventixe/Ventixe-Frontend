import authClient from "../api/authClient";

// signIn: POST /auth/signin
export const signIn = async (email, password) => {
    const response = await authClient.post("Auth/signin", { email, password });
    return response.data;
};

// register: POST /auth/signup
export const signUp = async (userData) => {
    const response = await authClient.post("Auth/signup", {
        email: userData.email,
        password: userData.password
    });
    return response.data;
};

// signOut: POST /auth/signout
export const signOut = async () => {
    // await authClient.post("auth/signout");
};