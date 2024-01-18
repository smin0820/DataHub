// QnaDetailReplyContainer.tsx
// Qna 게시글 상세 페이지(/qna/:id)의 댓글 컴포넌트입니다.

import React, { useEffect, useState, ChangeEvent } from "react";
import ApiService from "@components/axios/ApiService";
import { useQnaDetail } from "@hooks/useQnaDetail";
import { userState } from "@recoil/atoms/userStateAtom";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import QnaDetailReplyPresenter from "@components/qna/qna-detail/QnaDetailReply/QnaDetailReplyPresenter"
import { Reply } from "types/Articles";

const QnaDetailReplyContainer: React.FC = () => {
  const userInfo = useRecoilValue(userState); // 현재 작성자 정보
  const params = useParams().id; // 현재 게시글 id?
  const location = useLocation(); // 현재 게시글 정보?
  const replyInfo = { ...location.state }; // 현재 게시글 정보?
  // 현재 게시글의 댓글 정보
  const { replys: fetchedReplys, loading, error, refetchQnaDetail } = useQnaDetail(replyInfo.selectedqaId);
  // 댓글 목록
  const [replyList, setReplyList] = useState<Reply[]>([]);
  // 수정중인 댓글의 인덱스
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [newReply, setNewReply] = useState<string>();

  // 목록 새로고침 함수
  const refreshList = () => {
    refetchQnaDetail();
  };

  // 댓글 불러오기
  useEffect(() => {
    if (loading) {
      const Loading: Reply[] = [{replyId: 0, replyDate: "Loading...", replyContent: "Loading...", username: "Loading..."}];
      setReplyList(Loading);
    } else if (error) {
      const Error: Reply[] = [{replyId: 0, replyDate: "Error", replyContent: "Error", username: "Error"}];
      setReplyList(Error);
    } else {
      setReplyList(fetchedReplys);
    }
  }, [loading, error, fetchedReplys]);

  const handleReplyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      if(newReply){
        if(newReply.trim() !== '') {
          // 댓글 수정 
          if(editIndex !== -1) {
            await ApiService.editReply(userInfo.loginId, fetchedReplys[editIndex].replyId, newReply);
            refreshList();
            setEditIndex(-1);
          } else {
            // 댓글 작성
            await ApiService.registerReply(userInfo.loginId, params, newReply);
            refreshList();
          }
        }
      } 
    } catch (error) {
      console.error("댓글 작성 or 수정 실패", error);
    }
    setNewReply('');
  };

  // 댓글 삭제
  const handleReplyDelete = async (index: number) => {
    if(!userInfo || !userInfo.loginId) {
      console.error('사용자 정보가 없습니다.');
      return;
    }
    try {
      await ApiService.deleteReply(userInfo.loginId, fetchedReplys[index].replyId);
    } catch(error) {
      console.error('댓글 삭제 실패:', error);
    }
    refreshList();
  };

  const handleReplyEdit = async (index: number) => {
    setNewReply(fetchedReplys[index].replyContent);
    setEditIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleReplySubmit();
    }
  };

return (
  <QnaDetailReplyPresenter
    handleReplyChange={handleReplyChange}
    handleReplySubmit={handleReplySubmit}
    handleReplyDelete={handleReplyDelete}
    handleReplyEdit={handleReplyEdit}
    handleKeyDown={handleKeyDown}
    replyList={replyList}
    newReply={newReply || ''}
    editIndex={editIndex}
  />
);
}

export default QnaDetailReplyContainer;