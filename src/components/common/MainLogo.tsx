// MainLogo.tsx
// 메인 로고를 표시하는 컴포넌트입니다.

import React from "react";
import styled from "styled-components";
import logo from "@assets/images/logo.png";

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 60px;
`;

const LogoImage = styled.img`
    max-width: 100%;
    height: auto;
`;

const MainLogo: React.FC = () => {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
    );
};

export default MainLogo;
