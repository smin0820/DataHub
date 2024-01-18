// Qna.tsx
// Qna 페이지(/qna)의 레이아웃을 정의합니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import QnaTableContainer from './containers/QnaTableContainer';
import NoticeNewArticle from './containers/QnaNewArticle';

const Qna: React.FC = () => {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <NoticeNewArticle></NoticeNewArticle>
            <QnaTableContainer></QnaTableContainer>
        </>
    );
}

export default Qna;