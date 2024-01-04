import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";

const useIsLoggedIn = () => {
    const userInfo = useRecoilValue(userState);
  // userInfo가 null이 아니며 필요한 경우 추가적인 검증을 수행합니다.
  // 예를 들어, 사용자 역할이 'ADMIN' 또는 'USER'인지 확인할 수 있습니다.
    return userInfo !== null && userInfo.role !== "LOADING" && (userInfo.role === "ADMIN" || userInfo.role === "USER");
};

export default useIsLoggedIn;
