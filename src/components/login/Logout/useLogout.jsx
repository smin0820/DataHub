import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom'; 

export const useLogout = () => {
    const navigate = useNavigate();
    const resetUserState = useResetRecoilState(userState);

    return () => {
        resetUserState();   // Recoil 상태를 초기화
        localStorage.clear(); // 로컬 스토리지 클리어
        navigate('/login');   // 로그인 페이지로 이동
    };
};
