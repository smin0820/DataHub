// Notice.tsx
// Notice 페이지 전체를 렌더링하는 컴포넌트입니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import NoticeTableContainer from '@components/notice/containers/NoticeTableContainer';
import NoticeNewArticle from '@components/notice/containers/NoticeNewArticle';

const Notice: React.FC = () => {
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

export default Notice;