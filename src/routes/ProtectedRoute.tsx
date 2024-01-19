import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '@hooks/useIsLoggedIn';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';

type UserRoleType = string;

// ProtectedRoute의 props 타입을 정의합니다.
interface ProtectedRouteProps {
  element: ReactElement; // React 컴포넌트를 나타냄
  allowedRoles?: UserRoleType[]; // 허용된 역할
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, allowedRoles }) => {
    const [isLoggedIn, userInfo] = useIsLoggedIn();
    //const userInfo = useRecoilValue(userState);
    // 로그인되지 않았으면 로그인 페이지로 리디렉션
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }else 

    // 허용된 역할에 해당하지 않는 경우 /system으로 리디렉션
    if(userInfo) {
        if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
            return <Navigate to="/system" />;
        }
    } else {
        return <Navigate to="/login" />;
    }

    return Component;
};

export default ProtectedRoute;