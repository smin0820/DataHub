import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import SidebarContainer from '@components/common/containers/SidebarContainer';

const ToggleButton = styled.button`
  position: fixed;  // 고정 위치
  top: 50%;  // 중앙에 위치
  transform: translateY(-50%);  // 정확한 중앙 정렬을 위해
  left: ${({ isVisible }) => isVisible ? '202px' : '0px'};  // isVisible에 따라 위치 조정
  z-index: 10;
  background-color: #transparent;  // 배경색
  border: none;  // 테두리 없앰
  border-radius: 5px;  // 둥근 모서리
  padding: 10px;  // 패딩
  cursor: pointer;  // 커서 스타일 변경
  font-size: 30px;  // 폰트 크기
  transition: 0.2s;  // 부드러운 애니메이션을 위해
  font-weight: normal;  // 폰트 굵기
  &:focus {
    outline: none;  // 포커스시 테두리 없앰
  }
  &:hover {
    background-color: #e0e0e0;  // 호버 시 배경색 변경
    color: #4DBDE5;  // 호버 시 글자색 변경
    font-weight: bold; // 호버 시 폰트 굵기 변경
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);  // 호버 시 그림자 효과 추가
  }
`;

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(true);
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
      {userRole === 'ADMIN' && (
        <ToggleButton isVisible={isVisible} onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? '<' : '>'}
        </ToggleButton>
      )}
      {isVisible && <SidebarContainer />}
    </>
  );
}