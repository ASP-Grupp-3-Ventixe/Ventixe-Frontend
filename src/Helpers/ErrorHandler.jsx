import axios from "axios";
// import {toast} from "react-toastify";

export const handleError = (error) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;
        if (Array.isArray(err?.data?.errors)) {
            for (let val of err.data.errors) {
                // toast.warning(val.description);
                console.log(val.description);
            }
        } else if (typeof err?.data?.errors === "object" && err.data.errors !== null) {
            for (let e in err.data.errors) {
                // toast.warning(err.data.errors[e][0]);
                console.log(err.data.errors[e][0]);
            }
        } else if (err?.data) {
            // toast.warning(err.data);
            console.log(err.data);
        } else if (err?.status === 401) {
            // toast.warning("Please login");
            // window.history.pushState({}, "LoginPage", "/login");
            console.log("Please login");
        } else if (err) {
            // toast.warning(err.data);
            console.log(err.data);
        }
    } else {
        console.log(error);
    }
};

