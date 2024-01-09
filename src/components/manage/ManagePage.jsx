import HeaderContainer from '@components/common/Header/HeaderContainer';
import MainLogo from '@components/common/MainLogo';
import Sidebar from '@components/common/Sidebar';
import React from 'react';
import RegistButton from './RegistButton';
import ManageTableContainer from './ManageTableContainer';

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

