import React from 'react';
import AdminHeaderContainer from '@components/admin/containers/AdminHeaderContainer'
import AdminSearchContainer from '@components/admin/containers/AdminSearchContainer';
import Sidebar from '@components/common/Sidebar';
import AdminContentContainer from './containers/AdminContentContainer';
import MainLogo from '@components/common/MainLogo';




export default function Admin() {

    return (
        <>
            <AdminHeaderContainer></AdminHeaderContainer>
            <Sidebar></Sidebar>
            <MainLogo></MainLogo>
            <AdminSearchContainer></AdminSearchContainer>
            <AdminContentContainer></AdminContentContainer>
        </>
    );
}

