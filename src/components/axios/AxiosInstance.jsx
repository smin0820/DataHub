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

// export default axiosInstance;
const setupAxiosInterceptors = (onLogout) => {
    const onResponseError = (error) => {
        if (error.response && error.response.status === 500) {
            onLogout(); // 500 에러 시 로그아웃 실행
            alert("비정상적인 접근입니다. 다시 로그인해주세요.");
        }
        return Promise.reject(error);
    };

    axiosInstance.interceptors.response.use(response => response, onResponseError);
};

export { axiosInstance, setupAxiosInterceptors };