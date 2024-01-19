import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";

// userInfo 객체의 타입을 정의합니다.
interface UserInfoType {
  role: "ADMIN" | "USER" | "LOADING" | string;
}

const useIsLoggedIn = (): [boolean, UserInfoType | null] => {
  const userInfo = useRecoilValue<UserInfoType>(userState);

  const isLoggedIn =
    userInfo !== null &&
    userInfo.role !== "LOADING" &&
    (userInfo.role === "ADMIN" || userInfo.role === "USER");

  // 로그인 상태와 userInfo 객체를 배열로 반환합니다.
  return [isLoggedIn, userInfo];
};

export default useIsLoggedIn;
