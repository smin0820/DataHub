// SidebarStyles.ts
// 사이드바 관련 스타일

import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  $isVisible: boolean;
}

export const SidebarUL = styled.ul<SidebarProps>`
  // 사이드바 기본 스타일
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ $isVisible }) =>
    $isVisible ? "translateX(0)" : "translateX(-100%)"};
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨김
  }
  &:hover {
    &::-webkit-scrollbar {
      display: block; // 호버 시 스크롤바 보임
    }
  }
  list-style: none;
  padding: 0 1rem;
  position: fixed;
  top: 0px;
  bottom: 0px;
  z-index: 5;
  width: 180px;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  li {
    font-size: 14px;
    margin-bottom: 15px;
    &:hover {
      background-color: #e9ecef;
    }
  }
`;

export const SNavLink = styled(NavLink)`
  // 선택된 시스템 메뉴 스타일
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  border-radius: 5px;
  &.chosen {
    color: #4dbde5;
    font-weight: bold;
    background-color: #e9ecef;
  }
`;

export const ToggleButton = styled.button<SidebarProps>`
  // 사이드바 토글 버튼 스타일
  position: fixed;
  top: 50%;
  left: ${({ $isVisible }) =>
    $isVisible ? "202px" : "0px"}; // isVisible에 따라 위치 조정
  transform: translateY(-50%);
  z-index: 10;
  background-color: #f8f8f8; // 배경색
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 30px;
  font-weight: normal;
  &:focus {
    outline: none; // 포커스시 테두리 없앰
  }
  &:hover {
    background-color: #e0e0e0; // 호버 시 배경색 변경
    color: #4dbde5; // 호버 시 글자색 변경
    font-weight: bold; // 호버 시 폰트 굵기 변경
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 호버 시 그림자 효과 추가
  }
`;
