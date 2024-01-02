import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;

  div {
    width: 100%;
    max-width: 1000px;

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style: none;
      margin-top: 2rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #e5eaf2;

      span {
        font-size: small;
      }
      div:nth-child(1) {
        span:nth-child(1) {
          margin-right: 1rem;
        }
      }
      div:nth-child(2) {
        span {
          font-size: xx-small;
          margin-right: 0.5rem;
          cursor: pointer;
          opacity: 45%;
          &:hover {
            color: #4dbde5;
            font-weight: bold;
            opacity: 100%
          }
        }
      }
    }
  }
`;

export default function WrapComments() {
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      // 여기에 백엔드 API 호출 + 댓글 저장 기능 추가
      setCommentList([...commentList, newComment]);
      setNewComment('');
    }
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...commentList];
    updatedComments.splice(index, 1);
    setCommentList(updatedComments);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleCommentSubmit();
    }
  }

  return (
    <Container>
      <div>
        <ul>
          {commentList.map((comment, index) => (
            <li key={index}>
              <div>
                <span>adm**</span>
                <span>2024.01.02 11:24</span>
              </div>
              {comment}
              <div>
                <span>수정</span>
                <span>/</span>
                <span onClick={() => handleCommentDelete(index)}>지우기</span>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="댓글 남겨주세요..."
            value={newComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
          />
          <input type="button" value="작성" onClick={handleCommentSubmit} />
        </div>
      </div>
    </Container>
  );
}
