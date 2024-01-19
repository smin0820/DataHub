// ManagePage.tsx
// '시스템 관리' 페이지(/manage) 컴포넌트입니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer';
import MainLogo from '@components/common/MainLogo';
import Sidebar from '@components/common/Sidebar/Sidebar';
import RegistButton from '@components/manage/ManageTable/RegistButton';
import ManageTableContainer from '@components/manage/ManageTable/ManageTableContainer';

const ManagePage: React.FC = () => {
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

export default ManagePage;