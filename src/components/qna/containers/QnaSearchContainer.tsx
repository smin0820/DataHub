import React from 'react';
import * as S from '@components/qna/containers/styles';

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
              <option value="loginId">글쓴이</option>
            </select>
          <input type="search" placeholder="검색어를 입력해주세요" value={searchKeyword} onChange={handleSearchChange} />
        </div>
      </S.SearchFilter>
    );
}

export default SearchContainer;