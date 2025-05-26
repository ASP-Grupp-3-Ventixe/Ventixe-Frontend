import axios from "axios";
import { attachInterceptors } from "../Helpers/attachInterceptor.jsx";

const authClient = axios.create({
    baseURL: "https://kappeauthserviceprovider-avevcya4hrd2ahb2.swedencentral-01.azurewebsites.net/api/",
});

const accountClient = axios.create({
    baseURL: "https://kappeaccountserviceprovider-fpc6habrbpckg8ha.swedencentral-01.azurewebsites.net/api/",
});

attachInterceptors(authClient);
attachInterceptors(accountClient);


// signIn: 
export const signIn = async (email, password) => {
    const response = await authClient.post("Auth/signin", { email, password });
    return response.data;
};

// register: 
// export const signUp = async (userData) => {
//     const response = await authClient.post("Auth/signup", {
//         email: userData.email,
//         password: userData.password
//     });
//     return response.data;
// };

// signOut: 
export const signOut = async () => {
    const response = await authClient.post("Auth/signout");
    return response.data;
};