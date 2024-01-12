// useLogout.jsx
// 로그아웃을 처리하는 커스텀 훅입니다.

import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom'; 
import ApiService from '@components/axios/ApiService';

export const useLogout = () => {
    const navigate = useNavigate();
    const resetUserState = useResetRecoilState(userState);
    const userInfo = useRecoilValue(userState);

    return async () => {
        try {
            // 현재 로그인된 사용자 ID를 가져옵니다. 
            const loginId = userInfo.loginId;

            // 서버에 로그아웃 요청
            await ApiService.logoutUser(loginId);

            // Recoil 상태를 초기화
            resetUserState();

            // 로컬 스토리지 클리어
            localStorage.clear();

            // 로그인 페이지로 이동
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 처리 중 오류 발생:', error);

                        // Recoil 상태를 초기화
            resetUserState();

            // 로컬 스토리지 클리어
            localStorage.clear();

            // 로그인 페이지로 이동
            navigate('/login');
        }
    };
};
