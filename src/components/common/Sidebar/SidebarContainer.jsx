// SidebarContainer.jsx
// 사이드바 컨테이너

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedSystemIdState, sidebarVisibilityState } from '@recoil/atoms/systemStateAtom';
import { userState } from '@recoil/atoms/userStateAtom';
import ApiService from '@components/axios/ApiService';
import SidebarPresenter from '@components/common/Sidebar/SidebarPresenter';

export default function SidebarContainer() {
  const [systemNames, setSystemNames] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useRecoilState(selectedSystemIdState);
  const [isVisible, setIsVisible] = useRecoilState(sidebarVisibilityState);
  const [userInfo] = useRecoilState(userState);
  const userRole = userInfo?.role;
  const location = useLocation();
  // 토글버튼 이동
  const [buttonTop, setButtonTop] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (userRole === "ADMIN") {
      ApiService.fetchSystemNames().then(response => {
        const names = response.data.systems.map(system => ({
          id: system.systemId,
          name: system.systemName
        }));
        setSystemNames([{ id: 'admin', name: '대기중 게시물' }, ...names]);
      });
    }
    // URL 경로 기반으로 선택된 시스템 ID 설정
    const currentPath = location.pathname;
    if (currentPath === "/admin") {
      setSelectedSystemId("admin");
    } else if (currentPath === "/system") {
      setSelectedSystemId(selectedSystemId);
    } else {
      setSelectedSystemId(0);
    }
  }, [userRole, location.pathname]);

  /* 토글 버튼 이동 관련 로직 */
  // 초기 버튼 위치 설정 및 로컬 스토리지에서 위치 불러오기
  useEffect(() => {
    const savedButtonTop = localStorage.getItem('buttonTop');
    if (savedButtonTop) {
      const parsedButtonTop = parseInt(savedButtonTop, 10);
      if (!isNaN(parsedButtonTop)) {
        setButtonTop(parsedButtonTop);
      } else {
        setButtonTop(window.innerHeight / 2); // 로컬 스토리지 값이 유효하지 않은 경우
      }
    } else {
      setButtonTop(window.innerHeight / 2); // 로컬 스토리지에 값이 없을 경우
    }
  }, []);

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
  
  const handleDragStart = (e) => {
    setIsDragging(true);
    const button = document.getElementById('sidebar-toggle-button');
    const buttonRect = button.getBoundingClientRect();
    const offset = e.clientY - buttonRect.top - (buttonRect.height / 2); // 버튼 상단과 마우스 포인터 간의 차이
    setDragOffset(offset);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const newTop = e.clientY - dragOffset; // 마우스 위치에서 offset을 빼서 새 위치 계산
    setButtonTop(newTop);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    console.log('드래그 종료');
  };

  useEffect(() => {
  if (buttonTop !== undefined) {
    localStorage.setItem('buttonTop', buttonTop);
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