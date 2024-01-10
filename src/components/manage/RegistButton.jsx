import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Buttondiv = styled.div`
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