import styled from 'styled-components';
import { NavLink } from "react-router-dom";

export const Header = styled.div`
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
    }
`;

export const Navdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
`;

export const SNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &.active {
        color: #4dbde5;
        font-weight: bold;
    }
`;

export const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 2.1rem;
    right: 0px;
    width: 7rem;
    border: 2px solid #E5EAF2;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  /* 그림자 효과 추가 */
    background-color: white;
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
    }
    li {
        padding: 5px 15px;
        padding-right: 10px;
        cursor: pointer;
        border-bottom: 1px solid #E5EAF2; /* 항목 사이에 구분선을 추가 */
        &:hover {
            background-color: #e0e0e0;  // 호버 시 배경색 변경
            color: #4DBDE5;  // 호버 시 글자색 변경
            font-weight: bold; // 호버 시 폰트 굵기 변경
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);  // 호버 시 그림자 효과 추가
        }
        &:last-child {
            border-bottom: none; /* 마지막 항목에는 구분선을 제거 */
        }
    }
    &.active {
        color: #4DBDE5;
    }
`