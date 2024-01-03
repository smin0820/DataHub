import React from 'react';
import HeaderContainer from '@components/common/containers/HeaderContainer'
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

