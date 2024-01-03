import React from 'react';
import HeaderContainer from '@components/common/containers/HeaderContainer'
import AdminSearchContainer from '@components/admin/containers/AdminSearchContainer';
import Sidebar from '@components/common/Sidebar';
import AdminContentContainer from './containers/AdminContentContainer';
import MainLogo from '@components/common/MainLogo';




export default function Admin() {

    return (
        <>
            <HeaderContainer></HeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <AdminSearchContainer></AdminSearchContainer>
            <AdminContentContainer></AdminContentContainer>
        </>
    );
}

