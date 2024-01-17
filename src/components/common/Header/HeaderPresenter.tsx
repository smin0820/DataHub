// HeaderPresenter.tsx
// 헤더(상단 메뉴바) 프레젠터

import React from "react";
import logo from "@assets/images/logo.png";
import UserDropdown from "@components/common/Header/UserDropdown";
import { Header, Navdiv, SNavLink } from "@styles/HeaderStyles";

interface HeaderPresenterProps {
    view: boolean;
    isAdmin: boolean;
    userName: string;
    onLogoClick: () => void;
    onToggleView: () => void;
    onNavigate: (path: string) => void;
}

const HeaderPresenter: React.FC<HeaderPresenterProps> = ({ view, isAdmin, userName, onLogoClick, onToggleView, onNavigate }) => {
    return (
        <Header>
            <Navdiv>
                <a onClick={onLogoClick}>
                    <img src={logo} alt="logo.png" />
                </a>
                <nav>
                    <SNavLink to="/notice">공지사항</SNavLink>
                    <SNavLink to="/qna">Q&A</SNavLink>
                    {isAdmin && (
                        <SNavLink to="/manage">시스템 관리</SNavLink>
                    )}  
                    <span onClick={onToggleView}>
                        {userName}님 {view ? "∧" : "∨"}
                    </span>
                    {view && <UserDropdown />}
                </nav>
            </Navdiv>
        </Header>
    );
};

export default HeaderPresenter;