// SidebarContainer.tsx
// 사이드바 컨테이너

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedSystemIdState, sidebarVisibilityState } from '@recoil/atoms/systemStateAtom';
import { userState } from '@recoil/atoms/userStateAtom';
import ApiService from '@components/axios/ApiService';
import SidebarPresenter from '@components/common/Sidebar/SidebarPresenter';
import { systemListState } from '@recoil/atoms/systemListStateAtom';
import { System } from '@@types/Categories';

const SidebarContainer = () => {
  const [systemNames, setSystemNames] = useState<System[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useRecoilState(selectedSystemIdState);
  const [isVisible, setIsVisible] = useRecoilState<boolean>(sidebarVisibilityState);
  const [userInfo] = useRecoilState(userState);
  const userRole = userInfo?.role;
  const location = useLocation();
  const [systemList, setSystemList] = useRecoilState(systemListState);
  // 토글버튼 이동
  const [buttonTop, setButtonTop] = useState<number>(() => {
  const savedButtonTop = localStorage.getItem('buttonTop');
  /* 토글 버튼 이동 관련 로직 */
  // 초기 버튼 위치 설정 및 로컬 스토리지에서 위치 불러오기
  const parsedButtonTop = savedButtonTop ? parseInt(savedButtonTop, 10) : window.innerHeight / 2;
    return !isNaN(parsedButtonTop) ? parsedButtonTop : window.innerHeight / 2;
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [dragOffset, setDragOffset] = useState<number>(0);

  useEffect(() => {
    ApiService.fetchSystemNames().then(response => {
      if (response) {
        const names:System[] = response.data.systems.map((system: System) => ({
          systemId: system.systemId,
          systemName: system.systemName
        }));
        setSystemNames([{ systemId: -1, systemName: '대기중 게시물' }, ...names]);
      } else {
        console.error("시스템 이름을 불러오는데 실패했습니다.");
      }
    });
  }
  , [systemList]);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/admin") {
      setSelectedSystemId(-1);
    } else if (currentPath === "/system") {
      setSelectedSystemId(selectedSystemId);
    } else {
      setSelectedSystemId(0);
    }
  }, [userRole, location.pathname]);

    // 창 크기 변경에 따라 버튼 위치 업데이트
  useEffect(() => {
    const handleResize = () => {
      const newWindowHeight = window.innerHeight;
      const heightDifference = newWindowHeight - windowHeight; // 높이 차이 계산
      const newButtonTop = buttonTop + heightDifference * (buttonTop / windowHeight); // 높이 차이에 비례하여 버튼 위치 조정

      setWindowHeight(newWindowHeight);
      setButtonTop(newButtonTop);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [buttonTop, windowHeight]);
  
  const handleDragStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    const button = document.getElementById('sidebar-toggle-button') as HTMLButtonElement;
    const buttonRect = button.getBoundingClientRect();
    const offset = e.clientY - buttonRect.top - (buttonRect.height / 2); // 버튼 상단과 마우스 포인터 간의 차이
    setDragOffset(offset);
  };

  const handleDrag = (e: MouseEvent) => {
    e.preventDefault();
    const newTop = e.clientY - dragOffset; // 마우스 위치에서 offset을 빼서 새 위치 계산
    setButtonTop(newTop);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
  if (buttonTop !== undefined) {
    localStorage.setItem('buttonTop', buttonTop.toString());
  }
}, [buttonTop]);

  const handleToggleClick = () => {
  if (!isDragging) {
    setIsVisible(!isVisible); // 드래그가 발생하지 않았을 때만 토글 동작 수행
  }
};

useEffect(() => {
  if (isDragging) {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  } else {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  }

  return () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };
}, [isDragging]);



      return (
        <SidebarPresenter
          systemNames={systemNames}
          selectedSystemId={selectedSystemId}
          isVisible={isVisible}
          onSelectSystem={setSelectedSystemId}
          buttonTop={buttonTop}
          handleDragStart={handleDragStart}
          handleToggleClick={handleToggleClick}
        />
    );
}

export default SidebarContainer;