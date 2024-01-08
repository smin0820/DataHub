import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeButton = styled.button`
    margin-top: 100px;
    padding: 10px 20px;
    color: white;
    background-color: #007FFF;
    border: 1px solid #007FFF;
    border-radius: 10px;
    font-size: large;
    cursor: pointer;
`;

const Pagediv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    font-size: 20px;
`;

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    return (
        <Pagediv>
        <h1>404 Not Found</h1>
        <p>죄송합니다. 찾으시는 페이지를 찾을 수 없습니다.</p>
        <HomeButton onClick={goToHome}>홈으로 이동</HomeButton>
        </Pagediv>
    );
};

export default NotFoundPage;
