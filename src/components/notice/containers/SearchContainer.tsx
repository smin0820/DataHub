import ApiService from '@components/axios/ApiService';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as S from '@components/notice/containers/styles';

interface SearchContainerProps {
  searchKeyword: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOption: string;
  handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ searchKeyword, handleSearchChange, searchOption, handleOptionChange }) => {
    return (
      <S.SearchFilter>
        <div>
            <select value={searchOption} onChange={handleOptionChange}>
              <option value="title">제목</option>
              <option value="content">본문</option>
            </select>
          <input type="search" placeholder="공지사항 제목을 입력해주세요" value={searchKeyword} onChange={handleSearchChange} />
        </div>
      </S.SearchFilter>
    );
}

export default SearchContainer;