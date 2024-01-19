// SystemStyles.ts
// 시스템 페이지(/system)의 스타일을 정의합니다.

import styled from "styled-components";
import { Boarddiv } from "@styles/BoardStyles";

// 시스템 페이지의 탭메뉴의 컨테이너입니다.
export const TabMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  div {
    width: 100%;
    max-width: 1000px;
    h3 {
      margin-bottom: 30px;
    }
  }
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    gap: 4rem;
  }
  li {
    border: 2px solid black;
    padding: 7px 35px;
    border-bottom: none;
    cursor: pointer;
  }
  .focused {
    border: 2px solid #4dbde5;
    border-bottom: none;
  }
  button {
    padding: 5px 10px;
    color: white;
    background-color: #007fff;
    border: 1px solid #007fff;
    border-radius: 10px;
    font-size: medium;
    cursor: pointer;
    float: right;
  }
`;

// 시스템 페이지의 파일 목록을 보여주는 컨테이너입니다.
export const SystemBoarddiv = styled(Boarddiv)`
  th:first-child {
    // 증빙자료명
    width: 22%;
  }
  th:nth-child(2) {
    // 업로드 일시
    width: 20%;
  }
  th:nth-child(3) {
    // 검토결과
    width: 8%;
  }
  th:nth-child(4) {
    // 상세내역
    width: 20%;
  }
  th:nth-child(5) {
    // 관련파일
    width: 20%;
  }
  button.check {
    // 검토버튼
    padding: 2px 5px;
    color: white;
    background-color: #007fff;
    border: 1px solid #007fff;
    border-radius: 10px;
    font-size: medium;
    cursor: pointer;
    text-align: center;
  }
  button.delete {
    padding: 2px 5px;
    color: white;
    background-color: #cccccc;
    border: 1px solid #cccccc;
    border-radius: 10px;
    font-size: medium;
    cursor: pointer;
    text-align: center;
  }
`;
