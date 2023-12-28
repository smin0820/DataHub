import React from 'react';
import AdminHeaderContainer from '@components/admin/containers/AdminHeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import NoticeTableContainer from '@components/notice/containers/NoticeTableContainer';

export default function Notice() {
    return (
        <>
            <AdminHeaderContainer></AdminHeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <NoticeTableContainer></NoticeTableContainer>
        </>
    );
}

