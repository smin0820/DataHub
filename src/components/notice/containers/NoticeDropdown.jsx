import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 20;
    top: 100%;
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

export default function NoticeDropdown() {

    return (
        <Dropmenu>
            <ul>
                <li >정보수정</li>
                <li >로그아웃</li>
            </ul>
        </Dropmenu>
    );
}
