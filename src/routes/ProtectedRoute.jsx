import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '@hooks/useIsLoggedIn';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';


const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const isLoggedIn = useIsLoggedIn();
    const userInfo = useRecoilValue(userState);

    // 로그인되지 않았으면 로그인 페이지로 리디렉션
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    // 허용된 역할에 해당하지 않는 경우 /system으로 리디렉션
    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/system" />;
    }

    return Component;
};

export default ProtectedRoute;
