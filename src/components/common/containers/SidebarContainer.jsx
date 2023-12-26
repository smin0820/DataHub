import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ApiService from '@components/axios/ApiService';

const SidebarUL = styled.ul`
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


export default function SidebarContainer() {
  const [systemNames, setSystemNames] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = userInfo?.role;
  const location = useLocation();

  useEffect(() => {
    if (userRole === "ADMIN") {
      ApiService.fetchSystemNames().then(names => {
        setSystemNames([{ id: 'admin', name: '공지사항' }, ...names]);
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
    <SidebarUL>
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
  );
}