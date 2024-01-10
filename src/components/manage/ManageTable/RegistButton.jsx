// RegistButton.jsx
// '시스템 등록' 버튼 컴포넌트입니다.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Buttondiv } from '@styles/CommonStyles';

export default function RegistButton() {
    const navigate = useNavigate();
    return (
        <Container>
            <Buttondiv>
                <button onClick={() => {
                    navigate('/regist');
                }}>시스템 등록</button>
            </Buttondiv>
        </Container>
    );
}