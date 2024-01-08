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

const Inputdiv = styled.div`
  position: relative;
  margin-top: 1rem;
  input {
    width: 61.8rem;
    height: 10rem;
    padding: 0;
    font-size: medium;
    text-align: left;
    padding-left: 0.5rem;
    
  }
  button {
    position: absolute;
    width: 4rem;
    height: 2rem;
    top: 7rem;
    bottom: 0;
    right: 0.5rem;
    padding: 5px 10px;
    margin: auto 0;
    border-radius: 10px;
    color: white;
    font-size: medium;
    background-color: #007FFF;
    border: 1px solid #007FFF;
    cursor: pointer;
  }
`;
export default function Comments() {
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');
  // 수정중인 댓글의 인덱스
  const [editIndex, setEditIndex] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      if(editIndex !== null) {
        // 여기에 백엔드 API 호출 + 댓글 저장 기능 추가
        // 수정 모드인 경우
        const updatedComments = [...commentList];
        updatedComments[editIndex] = newComment;
        setCommentList(updatedComments);
        setEditIndex(null);
      } else {
        // 추가 모드인 경우
        setCommentList([...commentList, newComment]);
      }
      setNewComment('');
    }
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...commentList];
    updatedComments.splice(index, 1);
    setCommentList(updatedComments);
    // 삭제 시 수정 중인 상태로 초기화
    setEditIndex(null);
  }

  const handleCommentEdit = (index) => {
    setNewComment(commentList[index]);
    setEditIndex(index);
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
                <span onClick={() => handleCommentEdit(index)}>수정</span>
                <span>/</span>
                <span onClick={() => handleCommentDelete(index)}>지우기</span>
              </div>
            </li>
          ))}
        </ul>
        <Inputdiv>
          <input
            type="text"
            placeholder="댓글 남겨주세요..."
            value={newComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleCommentSubmit}>
            {editIndex !== null ? '수정' : '작성'}
          </button>
        </Inputdiv>
      </div>
    </Container>
  );
}
