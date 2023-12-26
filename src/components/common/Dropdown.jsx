import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 35px;
    right: 0px;
    width: 65px;
    border: 2px solid #E5EAF2;
    border-radius: 15px;
    padding: 10px 15px;
    padding-right: 50px;
    background-color: white;
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 7px;
        margin: 0;
        padding: 0;
    }
    li {
        cursor: pointer;
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
