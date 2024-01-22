// AdminPage.tsx
// 대기중 게시물 페이지(/admin)를 보여주는 컴포넌트입니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import Sidebar from '@components/common/Sidebar';
import AdminTablecontainer from '@components/admin/AdminTable/AdminTableContainer';
import MainLogo from '@components/common/MainLogo';

const AdminPage: React.FC = () => {
    return (
        <>
            <HeaderContainer />
            <Sidebar />
            <MainLogo />
            <AdminTablecontainer />
        </>
    );
}

export default AdminPage;