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

const MainLogo = () => {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
    );
};

export default MainLogo;
