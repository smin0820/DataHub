// Notice.jsx
// Notice 페이지 전체를 렌더링하는 컴포넌트입니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import NoticeTableContainer from '@components/notice/containers/NoticeTableContainer';
import NoticeNewArticle from '@components/notice/containers/NoticeNewArticle';

export default function Notice() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <NoticeNewArticle></NoticeNewArticle>
            <NoticeTableContainer></NoticeTableContainer>
        </>
    );
}

