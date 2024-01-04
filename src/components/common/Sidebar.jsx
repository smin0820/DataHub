import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import { selectedSystemIdState } from '@recoil/atoms/systemStateAtom';
import SidebarContainer from '@components/common/Sidebar/SidebarContainer';

export default function Sidebar() {
  const userInfo = useRecoilValue(userState);
  const selectedSystemId = useRecoilValue(selectedSystemIdState);

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
