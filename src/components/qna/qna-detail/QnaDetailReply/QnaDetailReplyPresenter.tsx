// QnaDetailReplyPresenter.tsx
// Qna 게시판 댓글 작성 프레젠터 컴포넌트

import React from "react";
import { QnaReplyContainer, QnaReplyInput } from "@styles/BoardStyles"
import { Reply } from "@@types/Articles";

interface QnaDetailReplyPresenterProps {
    replyList: Reply[];
    handleReplyEdit: (index: number) => void;
    handleReplyDelete: (index: number) => void;
    newReply: string;
    handleReplyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleReplySubmit: () => void;
    editIndex: number;
}

const QnaDetailReplyPresenter: React.FC<QnaDetailReplyPresenterProps> = ({
    replyList,
    handleReplyEdit,
    handleReplyDelete,
    newReply, handleReplyChange,
    handleKeyDown,
    handleReplySubmit,
    editIndex
}) => {
    return (
        <QnaReplyContainer>
        <div>
            <ul>
            {replyList.map((e, index) => (
                <li key={index}>
                <div>
                    <span>{e.username}</span>
                    <span>{e.replyDate}</span>
                </div>
                {e.replyContent}
                <div>
                    <span onClick={() => handleReplyEdit(index)}>수정</span>
                    <span>/</span>
                    <span onClick={() => handleReplyDelete(index)}>지우기</span>
                </div>
                </li>
            ))}
            </ul>
            <QnaReplyInput>
            <input
                type="text"
                placeholder="댓글 남겨주세요..."
                value={newReply}
                onChange={handleReplyChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleReplySubmit}>
                {editIndex !== null ? '수정' : '작성'}
            </button>
            </QnaReplyInput>
        </div>
        </QnaReplyContainer>
    );
}

export default QnaDetailReplyPresenter;