// AdminPage.jsx
// 대기중 게시물 페이지(/admin)를 보여주는 컴포넌트입니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import AdminSearchContainer from '@components/admin/AdminSearch/AdminSearchContainer';
import Sidebar from '@components/common/Sidebar';
import AdminTablecontainer from '@components/admin/AdminTable/AdminTableContainer';
import MainLogo from '@components/common/MainLogo';

export default function AdminPage() {

    return (
        <>
            <HeaderContainer></HeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <AdminSearchContainer></AdminSearchContainer>
            <AdminTablecontainer></AdminTablecontainer>
        </>
    );
}

