// System.tsx
// 시스템 페이지(/system)의 레이아웃을 담당하는 컴포넌트입니다.

import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import SystemTabMenuContainer from '@components/system/containers/SystemTabMenuContainer';
import Sidebar from '@components/common/Sidebar/Sidebar';

const System = () => {
    return (
      <>
        <HeaderContainer></HeaderContainer>
        <Sidebar></Sidebar>
        <SystemTabMenuContainer></SystemTabMenuContainer>
      </>
    );
};

export default System;