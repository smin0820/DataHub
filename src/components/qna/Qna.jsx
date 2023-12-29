import React from 'react';
import AdminHeaderContainer from '@components/admin/containers/AdminHeaderContainer'
import Sidebar from '@components/common/Sidebar';
import MainLogo from '@components/common/MainLogo';
import QnaTableContainer from './containers/QnaTableContainer';
export default function Qna() {
    return (
        <>
            <AdminHeaderContainer></AdminHeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <QnaTableContainer></QnaTableContainer>
        </>
    );
}

