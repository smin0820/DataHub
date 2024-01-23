// NoticeTableContainer.tsx
// 공지사항 목록을 표기하기 위한 컨테이너 컴포넌트
// NoticeContentContainer를 이용해서 공지사항의 내용물을 표기

import React, { useEffect, useState } from "react";
import NoticeContentContainer from "@components/notice/containers/NoticeContentContainer";
import { useNotices } from '@hooks/useNotices';
import PaginationComponent from '@components/common/PaginationComponent';
import { useRecoilState } from 'recoil';
import { noticesState } from '@recoil/atoms/noticesAtom';
import NoticeSearchContainer from "./NoticeSearchContainer";
import ApiService from '@components/axios/ApiService';



const NoticeTableContainer: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { notices, totalPages, loading, error, refetchNotices } = useNotices(currentPage);
    const [recoilNotices, setRecoilNotices] = useRecoilState(noticesState);
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
            ApiService.searchNoticeList(currentPage, searchKeyword, searchOption)
              .then((noticeData) => {
                setSearchResult(noticeData.content);
                setSearchTotalPage(noticeData.totalPages);
              })
              .catch((error) => {
                console.error('검색 실패:', error);
              });
          } else if (searchOption === "content") {
            ApiService.searchNoticeList(currentPage, searchKeyword, searchOption)
              .then((noticeData) => {
                setSearchResult(noticeData.content);
                setSearchTotalPage(noticeData.totalPages);
              })
              .catch((error) => {
                console.error('검색 실패:', error);
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
        refetchNotices();
    };

    useEffect(() => {
        refetchNotices();
        setRecoilNotices(notices);
    }, [recoilNotices]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
            <div>
                    <NoticeSearchContainer searchKeyword={searchKeyword} handleSearchChange={handleSearchChange} searchOption={searchOption} handleOptionChange={handleOptionChange}/>
                    <NoticeContentContainer title={"[공지사항]"} data={searchKeyword.length > 0 ? searchResult : notices} onRefresh={refreshList} />
                    <PaginationComponent 
                        currentPage={currentPage} 
                        totalPages={searchKeyword.length > 0 ? searchTotalPage : totalPages} 
                        onPageChange={handlePageChange} 
                    />
            </div>   

    );
}

export default NoticeTableContainer;