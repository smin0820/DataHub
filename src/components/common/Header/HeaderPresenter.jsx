// HeaderPresenter.jsx
// 헤더(상단 메뉴바) 프레젠터

import logo from "@assets/images/logo.png";
import UserDropdown from "@components/common/Header/UserDropdown";
import { Header, Navdiv, SNavLink } from "@styles/HeaderStyles";

const HeaderPresenter = ({ view, isAdmin, userName, onLogoClick, onToggleView, onNavigate }) => {
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
                        <button onClick={() => onNavigate('/manage')}>시스템 관리</button>
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