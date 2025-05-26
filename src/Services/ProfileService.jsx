import axios from "axios";
import {attachInterceptors} from "../Helpers/attachInterceptor.jsx";


const profileClient = axios.create({
    baseURL: "/api/",
});

attachInterceptors(profileClient);

export const createProfile = async (profile) => {
    const response = await profileClient.post("CreateProfile", profile);
    return response.data;
};


export const getProfile = async (userId) => {
    const response = await profileClient.get(`GetProfile/${userId}`);
    return response.data;
};


export const updateProfile = async (userId, profile) => {
    const response = await profileClient.put(`UpdateProfile/${userId}`, profile);
    return response.data;
};


export const deleteProfile = async (userId) => {
    const response = await profileClient.delete(`DeleteProfile/${userId}`);
    return response.data;
};