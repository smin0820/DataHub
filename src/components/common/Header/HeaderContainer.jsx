// HeaderContainer.jsx
// 헤더(상단 메뉴바) 컨테이너

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import { useNavigate } from "react-router-dom";
import HeaderPresenter from "@components/common/Header/HeaderPresenter";

const HeaderContainer = () => {
  const [view, setView] = useState(false);
  const navigate = useNavigate();  
  const userInfo = useRecoilValue(userState);
  const isAdmin = userInfo && userInfo.role === "ADMIN";
  const userName = userInfo ? userInfo.loginId : "User";
  
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