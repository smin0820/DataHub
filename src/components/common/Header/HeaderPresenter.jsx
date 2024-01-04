import logo from "/assets/images/logo.png"
import styled from "styled-components";
import Dropdown from "@components/common/Dropdown";
import { NavLink } from "react-router-dom";


const Header = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #E5EAF2;
    img {
        height: auto;
        width: 200px;
        cursor: pointer;
    }

    nav {
        display: flex;
        gap: 50px;
        align-items: center;
        position: relative;
        span {
        padding: 0;
        margin: 0;
        cursor: pointer;
        border: 1px solid #F1F1F1;
        border-radius: 10px;
        padding: 5px 8px;
        background-color:#F1F1F1;
        font-size: medium;
        }

        button {
        padding: 5px 10px;
        color: white;
        background-color: #007FFF;
        border: 1px solid #007FFF;
        border-radius: 10px;
        font-size: medium;
        cursor: pointer;
        }
    }
`;

const Navdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
`;

const SNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &.active {
        color: #4dbde5;
    }
`;

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
                        <button onClick={() => onNavigate('/regist')}>계정등록</button>
                    )}  
                    <span onClick={onToggleView}>
                        {userName}님 {view ? "∧" : "∨"}
                    </span>
                    {view && <Dropdown />}
                </nav>
            </Navdiv>
        </Header>
    );
};

export default HeaderPresenter;