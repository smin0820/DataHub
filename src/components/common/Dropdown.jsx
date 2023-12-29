import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 35px;
    right: 0px;
    width: 120px;
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

export default function Dropdown() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Dropmenu>
            <ul>
                <li onClick={()=>{navigate('/modify')}}>정보수정</li>
                <li onClick={handleLogout}>로그아웃</li>
            </ul>
        </Dropmenu>
    );
}
