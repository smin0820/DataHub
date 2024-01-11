// AxiosInstance.jsx
// Axios 인스턴스를 생성하는 파일입니다.

import axios from 'axios';
import ApiService from "@components/axios/ApiService";

// axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
    //baseURL: "/api",
    //baseURL: "http://localhost:8080",
    baseURL: "http://43.203.63.39:8080",
});

// 토큰이 있으면 axios 요청에 토큰을 실어 보냅니다.
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


let isRefreshingToken = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// 500 에러 혹은 기타 에러발생시 로그아웃 실행
let isAlertShown = false; // 에러 발생시 alert가 여러번 뜨는 것을 방지합니다.

const setupAxiosInterceptors = (onLogout) => {
    axiosInstance.interceptors.response.use(response => response, async (error) => {
        const originalRequest = error.config;

        if (error.response && ( error.response.status === 401 || error.response.status === 500 ) && !originalRequest._retry) {
            if (isRefreshingToken) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshingToken = true;

            const refreshToken = localStorage.getItem('refreshToken');
            // 원래 요청에 "Bearer " 접두사를 붙여 refreshToken 추가
            originalRequest.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
            try {
                const response = await axiosInstance(originalRequest);
                // 'new-access-token' 헤더를 체크
                const newAccessToken = response.headers['new-access-token'];
                // 새 토큰 저장 및 사용
                if (newAccessToken) {
                    localStorage.setItem('jwtToken', newAccessToken);
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                }
                isRefreshingToken = false;
                    
                return Promise.resolve(response);
            } catch (retryError) {
                processQueue(retryError, null);
                isRefreshingToken = false;
                return Promise.reject(retryError);
            }
        } else {
            return Promise.reject(error);
        }
    });
};

export { axiosInstance, setupAxiosInterceptors };