// HeaderContainer.tsx
// 헤더(상단 메뉴바) 컨테이너

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import { useNavigate } from "react-router-dom";
import HeaderPresenter from "@components/common/Header/HeaderPresenter";

const HeaderContainer: React.FC = () => {
  const [view, setView] = useState<boolean>(false);
  const navigate = useNavigate();  
  const userInfo = useRecoilValue(userState);
  const isAdmin = userInfo?.role === "ADMIN";
  const userName = userInfo?.loginId || "User";
  
  // 유저에 따라서 관리자 페이지로 이동할지, 일반 사용자 페이지로 이동할지 결정
  const handleLogoClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/system");
    }
  };

  return (
    <HeaderPresenter
      view={view}
      isAdmin={isAdmin}
      userName={userName}
      onLogoClick={handleLogoClick}
      onToggleView={() => setView(!view)}
      onNavigate={navigate}
    />
  );
};
  
  export default HeaderContainer;