import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;

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
            <li key={index}>{comment}</li>
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
          <button onClick={handleCommentSubmit}>작성</button>
        </div>
      </div>
    </Container>
  );
}
