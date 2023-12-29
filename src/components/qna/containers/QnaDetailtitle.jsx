import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;

  div {
    width: 100%;
    max-width: 1000px;
    h1 {
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
    p {
        margin: 0;
    }
    p:last-child {
        padding-bottom: 2rem;      
        border-bottom: 2px solid #e5eaf2;
    }
  }

  div:last-child {
    padding-top: 2rem;
  }
`;

export default function QnaDetailtitle() {
    return (
      <Container>
        <div>
          <div>
            <h1>질문질문질문질문질문질문질문질문질문질문</h1>
            <p>작성자</p>
            <p>2023.12.29 13:28</p>
          </div>
          
          <div>
            <p>본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문</p>
          </div>
        </div>
      </Container>
    );
}

