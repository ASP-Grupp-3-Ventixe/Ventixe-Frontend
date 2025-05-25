import axios from "axios";
import { attachInterceptors } from "../Helpers/attachInterceptor.jsx";

const verificationClient = axios.create({
    baseURL: "https://ventixe-verificationserviceprovider.azurewebsites.net/api/",
});

attachInterceptors(verificationClient);

export const sendVerificationEmail = async (email) => {
    const res = await verificationClient.post("verify", { Email: email });
    return res.data; 
};

export const verifyCode = async (email, code) => {
    const res = await verificationClient.post("verify-code", { Email: email, code });
    return res.data;
};
