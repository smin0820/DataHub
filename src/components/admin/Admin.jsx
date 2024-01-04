import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import AdminSearchContainer from '@components/admin/AdminSearch/AdminSearchContainer';
import Sidebar from '@components/common/Sidebar';
import AdminTablecontainer from '@components/admin/AdminTable/AdminTableContainer';
import MainLogo from '@components/common/MainLogo';

export default function Admin() {

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

