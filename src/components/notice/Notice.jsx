import React from 'react';
import AdminHeaderContainer from '@components/admin/containers/AdminHeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import NoticeTableContainer from '@components/notice/containers/NoticeTableContainer';
import NoticeNewArticle from '@components/notice/containers/NoticeNewArticle';

export default function Notice() {
    return (
        <>
            <AdminHeaderContainer></AdminHeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <NoticeNewArticle></NoticeNewArticle>
            <NoticeTableContainer></NoticeTableContainer>
        </>
    );
}

