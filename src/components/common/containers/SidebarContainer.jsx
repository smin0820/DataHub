import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ApiService from '@components/axios/ApiService';

const SidebarUL = styled.ul`
    transition: transform 0.3s ease, opacity 0.3s ease;  // 애니메이션 효과 추가
    transform: ${({ $isVisible }) => $isVisible ? 'translateX(0)' : 'translateX(-100%)'};
    opacity: ${({ $isVisible }) => $isVisible ? '1' : '0'};
    list-style: none;
    padding: 0 1rem;
    position: fixed;
    top: 25%;
    z-index: 5;
    width: 180px;  /* 너비 조정 */
    background-color: #f8f8f8;  /* 배경색 변경 */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  /* 그림자 효과 추가 */
    border-radius: 10px;  /* 모서리 둥글게 */
    li {
        font-size: 14px;  /* 폰트 크기 조정 */
        margin-bottom: 15px;  /* 여백 조정 */
        &:hover {
            background-color: #e9ecef;  /* 호버 효과 */
        }
    }
`

const SNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;  /* 기본 색상 변경 */
  padding: 10px 15px;  /* 패딩 조정 */
  border-radius: 5px;  /* 모서리 둥글게 */

  &.chosen {
      color: #4DBDE5;  /* 활성 링크 색상 변경 */
      font-weight: bold;  /* 폰트 굵기 변경 */
      background-color: #e9ecef;  /* 배경색 추가 */
  }

  &:hover {
      text-decoration: underline;  /* 호버 시 밑줄 */
  }
`

const ToggleButton = styled.button`
  position: fixed;
  top: 50%;
  left: ${({ $isVisible }) => $isVisible ? '202px' : '0px'};  // isVisible에 따라 위치 조정
  transform: translateY(-50%);
  z-index: 10;
  background-color: #transparent;  // 배경색
  border: none;  // 테두리 없앰
  border-radius: 5px;  // 둥근 모서리
  padding: 10px;  // 패딩
  cursor: pointer;  // 커서 스타일 변경
  font-size: 30px;  // 폰트 크기
  transition: 0.3s;  // 부드러운 애니메이션을 위해
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


export default function SidebarContainer() {
  const [systemNames, setSystemNames] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = userInfo?.role;
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  

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

  const handleSystemClick = (systemId) => {
    setSelectedSystemId(systemId);
    localStorage.setItem("selectedSystemId", JSON.stringify({ systemId }));
    window.location.reload();
  };

  const isSelected = (systemId) => {
    return systemId === selectedSystemId;
  };

  return (
    <>
    <ToggleButton
        onClick={toggleSidebar}
        $isVisible={isVisible}
      >
        {isVisible ? '<' : '>'} 
      </ToggleButton>
    <SidebarUL $isVisible={isVisible}>
      {systemNames.map((system) => (
        <li key={system.id} onClick={() => handleSystemClick(system.id)}>
          <SNavLink 
            to={system.id === 'admin' ? '/admin' : '/system'}
            className={isSelected(system.id) ? "chosen" : ""}
          >
            {system.name}
          </SNavLink>
        </li>
      ))}
    </SidebarUL>
    </>
    
  );
}