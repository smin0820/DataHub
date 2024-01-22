// NoticeTableContainer.tsx
// 공지사항 목록을 표기하기 위한 컨테이너 컴포넌트
// NoticeContentContainer를 이용해서 공지사항의 내용물을 표기

import React, { useEffect, useState } from "react";
import NoticeContentContainer from "@components/notice/containers/NoticeContentContainer";
import { useNotices } from '@hooks/useNotices';
import PaginationComponent from '@components/common/PaginationComponent';
import { useRecoilState } from 'recoil';
import { noticesState } from '@recoil/atoms/noticesAtom';
import SearchContainer from "./SearchContainer";
import ApiService from '@components/axios/ApiService';



const NoticeTableContainer: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { notices, totalPages, loading, error, refetchNotices } = useNotices(currentPage);
    const [recoilNotices, setRecoilNotices] = useRecoilState(noticesState);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchTotalPage, setSearchTotalPage] = useState(0);

    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    useEffect(() => {
        if (searchKeyword) {
            ApiService.searchNotice(currentPage, searchKeyword)
                .then((noticeData) => {
                    setSearchResult(noticeData.content); // 검색 결과를 저장
                    setSearchTotalPage(noticeData.totalPages);
                })
                .catch((error) => {
                    console.error('검색 실패:', error);
                })
            } else {
                // 검색어가 비어있을 때의 처리를 추가할 수 있습니다.
                setSearchResult([]);
            }
    }, [searchKeyword, currentPage]) // 검색어가 변경될 때마다 useEffect 실행

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
                <SearchContainer searchKeyword={searchKeyword} handleSearchChange={handleSearchChange} />
                <div>
                    <NoticeContentContainer title={"[공지사항]"} data={searchKeyword.length > 0 ? searchResult : notices} onRefresh={refreshList} />
                    <PaginationComponent 
                        currentPage={currentPage} 
                        totalPages={searchKeyword.length > 0 ? searchTotalPage : totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </div>
            </div>   

    );
}

export default NoticeTableContainer;