import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://54.166.160.145:8080",

});

export default axiosInstance;
