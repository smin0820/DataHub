import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import SidebarContainer from '@components/common/containers/SidebarContainer';

export default function Sidebar() {
  const [userRole, setUserRole] = useState(null);
  const [selectedSystemId, setSelectedSystemId] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserRole(userInfo?.role);

    const storedSystemId = JSON.parse(localStorage.getItem("selectedSystemId"))?.systemId;
    setSelectedSystemId(storedSystemId);
  }, []);

  useEffect(() => {
    // 선택된 시스템이 변경될 때 탭 상태 초기화
    localStorage.removeItem('currentTab');
  }, [selectedSystemId]);

  return (
    <>
      {userRole === 'ADMIN' && <SidebarContainer />}
    </>
  );
}