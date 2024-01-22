import ApiService from '@components/axios/ApiService';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchFilter = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.2rem 0rem;
  div {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
  }
  input {
    border: 2px solid #e5eaf2;
    padding: 10px;
    border-radius: 0.7rem;
    font-size: medium;
    width: 35%;
  }
`;

interface SearchContainerProps {
  searchKeyword: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ searchKeyword, handleSearchChange }) => {
    return (
      <SearchFilter>
        <div>
          <input type="search" placeholder="공지사항 제목을 입력해주세요" value={searchKeyword} onChange={handleSearchChange} />
        </div>
      </SearchFilter>
    );
}

export default SearchContainer;