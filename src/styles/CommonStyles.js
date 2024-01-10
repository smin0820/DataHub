import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const Buttondiv = styled.div` // 시스템 등록 버튼
    width: 100%;
    max-width: 1000px;

    button {
        padding: 5px 10px;
        color: white;
        background-color: #007fff;
        border: 1px solid #007fff;
        border-radius: 10px;
        font-size: medium;
        cursor: pointer;
        float: right;
    }
`;
