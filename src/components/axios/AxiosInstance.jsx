import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState } from '@recoil/atoms/tokenStateAtom';

const axiosInstance = axios.create({
    //baseURL: "http://54.166.160.145:8080",
    //baseURL: "http://localhost:8080",
    baseURL: "http://43.203.63.39:8080",
    //baseURL: ""
});

axiosInstance.interceptors.request.use(config => {

    if (config.url !== '/users' || config.method !== 'post') {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
