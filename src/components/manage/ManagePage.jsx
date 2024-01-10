// ManagePage.jsx
// '시스템 관리' 페이지(/manage) 컴포넌트입니다.

import HeaderContainer from '@components/common/Header/HeaderContainer';
import MainLogo from '@components/common/MainLogo';
import Sidebar from '@components/common/Sidebar';
import React from 'react';
import RegistButton from '@components/manage/ManageTable/RegistButton';
import ManageTableContainer from '@components/manage/ManageTable/ManageTableContainer';

export default function ManagePage() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <RegistButton></RegistButton>
            <ManageTableContainer></ManageTableContainer>
        </>
    );
}

