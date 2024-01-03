import React from 'react';
import HeaderContainer from '@components/common/containers/HeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import QnaTableContainer from './containers/QnaTableContainer';
import NoticeNewArticle from './containers/QnaNewArticle';
export default function Qna() {
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

