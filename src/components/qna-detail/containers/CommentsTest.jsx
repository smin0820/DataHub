import ApiService from "@components/axios/ApiService";
import { useQnaDetail } from "@hooks/useQnaDetail";
import { userState } from "@recoil/atoms/userStateAtom";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

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
            opacity: 100%;
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
    background-color: #007fff;
    border: 1px solid #007fff;
    cursor: pointer;
  }
`;

export default function CommentsTest() {
  const userInfo = useRecoilValue(userState);
  const [newComment, setNewComment] = useState("");
  const params = useParams().id;

  const location = useLocation();
  const commentInfo = { ...location.state };
  const {
    replys: fetchedReplys,
    loading,
    error,
  } = useQnaDetail(commentInfo.selectedqaId);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (loading) {
      setCommentList(["Loding..."]);
    } else if (error) {
      setCommentList(["Error"]);
    } else {
      setCommentList(fetchedReplys);
      console.log(fetchedReplys);
    }
  }, [loading, error, fetchedReplys]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      await ApiService.registerComment(userInfo.loginId, params, newComment);
      console.log("댓글 작성 성공~!");
    } catch (error) {
      console.log("댓글 작성 실패", error);
    }
    setNewComment("");
    window.location.reload();
  };

  const handleCommentDelete = async () => {
	
  };

  const handleCommentEdit = () => {};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  return (
    <Container>
      <div>
        <ul>
          {commentList.map((e, index) => (
            <li key={index}>
              <div>
                <span>{e.username}</span>
                <span>{e.replyDate}</span>
              </div>
              {e.replyContent}
              <div>
                <span onClick={() => handleCommentEdit()}>수정</span>
                <span>/</span>
                <span onClick={() => handleCommentDelete()}>지우기</span>
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
          <button onClick={handleCommentSubmit}>작성</button>
        </Inputdiv>
      </div>
    </Container>
  );
}
