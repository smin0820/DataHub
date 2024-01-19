// QnaDetail.tsx
// Qna 게시글 상세 페이지(/qna/:id)의 레이아웃을 정의합니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import QnaDetailTitleContainer from '@components/qna/qna-detail/QnaDetailTitle/QnaDetailTitleConatiner';
import QnaDetailReplyContainer from '@components/qna/qna-detail/QnaDetailReply/QnaDetailReplyContainer';

export default function QnaDetail() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <QnaDetailTitleContainer></QnaDetailTitleContainer>
            <QnaDetailReplyContainer></QnaDetailReplyContainer>
        </>
    );
}

