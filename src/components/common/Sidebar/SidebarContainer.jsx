import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedSystemIdState, sidebarVisibilityState } from '@atoms/systemStateAtom';
import { userState } from '@atoms/userStateAtom';
import ApiService from '@components/axios/ApiService';
import SidebarPresenter from '@components/common/Sidebar/SidebarPresenter';



export default function SidebarContainer() {
  const [systemNames, setSystemNames] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useRecoilState(selectedSystemIdState);
  const [isVisible, setIsVisible] = useRecoilState(sidebarVisibilityState);
  const [userInfo] = useRecoilState(userState);
  const userRole = userInfo?.role;
  const location = useLocation();

  useEffect(() => {
    if (userRole === "ADMIN") {
      ApiService.fetchSystemNames().then(names => {
        setSystemNames([{ id: 'admin', name: '대기중 게시물' }, ...names]);
      });
    }
    // URL 경로 기반으로 선택된 시스템 ID 설정
    const currentPath = location.pathname;
    if (currentPath === "/admin") {
      setSelectedSystemId("admin");
    } else if (currentPath === "/system") {
      const storedSystemId = JSON.parse(localStorage.getItem("selectedSystemId"))?.systemId;
      setSelectedSystemId(storedSystemId);
    }
  }, [userRole, location.pathname]);

    return (
    <SidebarPresenter
      systemNames={systemNames}
      selectedSystemId={selectedSystemId}
      isVisible={isVisible}
      onToggleSidebar={setIsVisible}
      onSelectSystem={setSelectedSystemId}
    />
  );
}