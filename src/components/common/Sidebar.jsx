import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@atoms/userStateAtom';
import { selectedSystemIdState } from '@atoms/systemStateAtom';
import SidebarContainer from '@components/common/Sidebar/SidebarContainer';

export default function Sidebar() {
  const userInfo = useRecoilValue(userState);
  const selectedSystemId = useRecoilValue(selectedSystemIdState);

  console.log("userinfo", userInfo.role);

  useEffect(() => {
    // 선택된 시스템이 변경될 때 탭 상태 초기화
    localStorage.removeItem('currentTab');
  }, [selectedSystemId]);

  return (
    <>
      {userInfo.role === 'ADMIN' && <SidebarContainer />}
    </>
  );
}
