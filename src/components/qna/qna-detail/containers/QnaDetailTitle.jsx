import { useQnaDetail } from '@hooks/useQnaDetail';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const commentInfo = {...location.state};
    const {content: fetchedContent, qa: fetchedQa, loading, error } = useQnaDetail(commentInfo.selectedqaId);
    const [qa, setQa] = useState('');
    const [title, setTitle] = useState('');
    const [conetent, setConent] = useState('');

    useEffect(() => {
      if (loading) {
          setTitle('Loading...');
          setConent('');
          setQa('');
      } else if (error) {
          setTitle('Error');
          setConent(error.message);
          setQa(error.message);
      } else {
          setTitle(fetchedQa.qaTitle);
          setConent(fetchedContent);
          setQa(fetchedQa);
      }
  }, [loading, error, fetchedContent, fetchedQa]);

    return (
      <Container>
        <div>
          <div>
            <h1>{title}</h1>
            <p>{qa.username}</p>
            <p>{qa.qaDate}</p>
          </div>
          
          <div>
            <p>{conetent}</p>
          </div>
        </div>
      </Container>
    );
}

