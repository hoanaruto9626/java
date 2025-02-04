import axios from "axios";

const axiosInstace = axios.create({
    baseURL: "http://localhost/api/public",
});

let hasRedirected = false;

if(!localStorage.getItem("hasRedirected")){
    hasRedirected = true;
    localStorage.setItem("hasRedirected", true);
    window.location.href = "/Login";
}

axiosInstace.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401){
            if(!localStorage.getItem("hasRedirected")){
                hasRedirected = true;
                localStorage.setItem("hasRedirected", true);
                window.location.href = "/Login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstace;