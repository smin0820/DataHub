import React from 'react';
import styled from 'styled-components';

const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 20;
    top: 1.65rem;
    right: 0px;
    width: 4rem;
    border: 2px solid #E5EAF2;
    border-radius: 15px;
    padding: 0.5rem 1rem;
    padding-right: 0.5rem;
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
                <li>수정</li>
                <li>삭제</li>
            </ul>
        </Dropmenu>
    );
}