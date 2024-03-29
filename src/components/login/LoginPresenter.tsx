// LoginPresenter.tsx
// 로그인 페이지를 렌더링하는 컴포넌트입니다.

import React, { ChangeEventHandler, FormEventHandler } from "react";
import styled from "styled-components";
import logo from "@assets/images/logo.png";

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const LoginBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 27rem;
    border: 2px solid #7b91a7;
    border-radius: 10px;
    margin-top: 4rem;
    img {
        width: auto;
        height: 80px;
        margin-top: 90px;
        margin-bottom: 30px;
    }
    form {
        border-radius: 10px;
    }
    input {
        border: 2px solid #7b91a7;
        border-radius: 5px;
        padding: 10px 7px;
        margin-bottom: 30px;
        display: block;
        width: 93%;
    }
    button {
        border: 2px solid #003a75;
        border-radius: 5px;
        height: 39px;
        width: 100%;
        margin: 70px 0;
        color: white;
        background-color: #003a75;
        cursor: pointer;
    }
    p {
        color: #7b91a7;
        font-size: small;
    }
`;

interface LoginPresenterProps {
    username: string;
    password: string;
    error: string;
    onUsernameChange: ChangeEventHandler<HTMLInputElement>;
    onPasswordChange: ChangeEventHandler<HTMLInputElement>;
    onFormSubmit: FormEventHandler<HTMLFormElement>;
}

const LoginPresenter: React.FC<LoginPresenterProps> = ({ 
    username,
    password,
    error,
    onUsernameChange,
    onPasswordChange,
    onFormSubmit
}) => {
    return (
        <Container>
        <LoginBox>
            <div>
            <img src={logo} alt="logo.png" />
            <form onSubmit={onFormSubmit}>
                <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={onUsernameChange}
                />

                <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onPasswordChange}
                />
                {error && <p>{error}</p>}
                <button type="submit">로그인</button>
            </form>
            <p>© 2023. (주)제이솔루션 all rights reserved.</p>
            </div>
        </LoginBox>
        </Container>
    );
}

export default LoginPresenter;