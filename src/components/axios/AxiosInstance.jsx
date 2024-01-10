// AxiosInstance.jsx
// Axios 인스턴스를 생성하는 파일입니다.

import axios from 'axios';

// axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
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

// 500 에러 혹은 기타 에러발생시 로그아웃 실행
let isAlertShown = false; // 에러 발생시 alert가 여러번 뜨는 것을 방지합니다.

const setupAxiosInterceptors = (onLogout) => {
    const onResponseError = (error) => {
        if (error.response && error.response.status === 500) {
            if (!isAlertShown) { // 경고창이 아직 뜨지 않았다면
                isAlertShown = true; // 경고창을 띄우고
                onLogout(); // 500 에러 시 로그아웃 실행
                alert("비정상적인 접근입니다. 다시 로그인해주세요.");
                isAlertShown = false; // 경고창이 뜨고 나면 다시 경고창을 띄울 수 있도록 false로 바꿔줍니다.
            }
        }
        return Promise.reject(error);
    };
    axiosInstance.interceptors.response.use(response => response, onResponseError);
};

export { axiosInstance, setupAxiosInterceptors };