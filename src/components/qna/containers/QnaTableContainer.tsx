// QnaTableContainer.tsx
// Q&A 목록을 표기하기 위한 컨테이너 컴포넌트
// QnaContentContainer를 이용해서 Q&A의 내용물을 표기

import React, { useEffect, useState } from "react";
import { useQnas } from '@hooks/useQnas';
import QnaContentContainer from "./QnaContentContainer";
import { qnasState } from "@recoil/atoms/qnasAtom";
import { useRecoilState } from "recoil";
import PaginationComponent from '@components/common/PaginationComponent';
import QnaSearchConatiner from '@components/qna/containers/QnaSearchContainer';
import ApiService from "@components/axios/ApiService";

export default function QnaTableContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const { qnas, totalPages, loading, error, refetchQnas } = useQnas(currentPage);
    const [recoilQnas, setRecoilQnas] = useRecoilState(qnasState);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchTotalPage, setSearchTotalPage] = useState(0);
    const [searchOption, setSearchOption] = useState("title"); // 기본값: 제목
    
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchOption(e.target.value);
    }

    useEffect(() => {
        if (searchKeyword) {
          if (searchOption === "title") {
            ApiService.searchQnaList(currentPage, searchKeyword, searchOption)
              .then((qnaData) => {
                setSearchResult(qnaData.content);
                setSearchTotalPage(qnaData.totalPages);
              })
              .catch((error) => {
                console.error('Q&A 제목 검색 실패:', error);
              });
          } else if (searchOption === "content") {
            ApiService.searchQnaList(currentPage, searchKeyword, searchOption)
              .then((qnaData) => {
                setSearchResult(qnaData.content);
                setSearchTotalPage(qnaData.totalPages);
              })
              .catch((error) => {
                console.error('Q&A 본문 검색 실패:', error);
              });
          } else if (searchOption === "loginId") {
            ApiService.searchQnaList(currentPage, searchKeyword, searchOption)
              .then((qnaData) => {
                setSearchResult(qnaData.content);
                setSearchTotalPage(qnaData.totalPages);
              })
              .catch((error) => {
                console.error('Q&A 작성자 검색 실패:', error);
              });
          }
        } else {
          setSearchResult([]);
        }
      }, [searchKeyword, currentPage, searchOption])


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // 목록 새로고침 함수
    const refreshList = () => {
        refetchQnas();
    };

    useEffect(() => {
        refetchQnas();
        setRecoilQnas(qnas);
    }, [recoilQnas]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <QnaSearchConatiner searchKeyword={searchKeyword} handleSearchChange={handleSearchChange} searchOption={searchOption} handleOptionChange={handleOptionChange}/>
            <QnaContentContainer title={"[Q&A 게시판]"}  data={searchKeyword.length > 0 ? searchResult : qnas} onRefresh={refreshList} />
            <PaginationComponent 
                currentPage={currentPage} 
                totalPages={searchKeyword.length > 0 ? searchTotalPage : totalPages}
                onPageChange={handlePageChange} 
            />
        </div>    
    );
}