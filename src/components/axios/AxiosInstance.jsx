import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: "http://54.166.160.145:8080",
    //baseURL: "http://localhost:8080",
    baseURL: "http://43.203.63.39:8080",
    //baseURL: ""
});

export default axiosInstance;
