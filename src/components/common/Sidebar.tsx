// Sidebar.tsx
// 관리자일 경우에 사이드바 컨테이너를 불러옵니다.

import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import SidebarContainer from '@components/common/Sidebar/SidebarContainer';

const Sidebar: React.FC = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      {userInfo.role === 'ADMIN' && <SidebarContainer />}
    </>
  );
}

export default Sidebar;