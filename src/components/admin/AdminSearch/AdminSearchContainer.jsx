// AdminSearchContainer.jsx
// 관리자의 검색기능을 위한 컨테이너 컴포넌트(미완성) 입니다.

import React from 'react';
import styled from 'styled-components';

const SearchFilter = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0px;
  div {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
  }
  select {
    border: 2px solid #e5eaf2;
    border-right: 1px;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    font-size: medium;
    cursor: pointer;
  }
  input {
    border: 2px solid #e5eaf2;
    padding: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: medium;
    width: 25%;
  }
`;


export default function Search() {
    return (
      <SearchFilter>
        <div>
          {/* <select>
            <option>전체</option>
            <option>업로드 일시</option>
            <option>검토결과</option>
            <option>상세내역</option>
          </select>
          <input type="search" placeholder="검색어를 입력해 주세요" /> */}
        </div>
      </SearchFilter>
    );
}

