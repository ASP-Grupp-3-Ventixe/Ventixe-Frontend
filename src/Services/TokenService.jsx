import axios from "axios";
import { attachInterceptors } from "../Helpers/attachInterceptor.jsx";

const tokenClient = axios.create({
    baseURL: "https://tokenserviceprovider.onrender.com/api/",
});

attachInterceptors(tokenClient);

// Validate access token
export const validateToken = async ({ accessToken, userId }) => {
    const response = await tokenClient.post("ValidateToken", {
        accessToken,
        userId
    });
    return response.data; 
};


// Generate new token
export const generateToken = async ({ userId, email, role }) => {
    const response = await tokenClient.post("Auth/token", {
        userId,
        email,
        role
    });
    return response.data;
};

// Get a new access token using the refresh token

