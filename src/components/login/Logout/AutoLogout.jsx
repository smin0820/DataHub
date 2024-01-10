// AutoLogout.jsx
// 토큰 만료시 자동 로그아웃
import { useLogout } from '@components/login/Logout/useLogout';
import { useEffect } from 'react';
import { setupAxiosInterceptors } from '@components/axios/AxiosInstance';

export const useEnhancedLogout = () => {
    const logout = useLogout();

    useEffect(() => {
        setupAxiosInterceptors(logout);
    }, [logout]);

    return logout;
};