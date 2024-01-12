// NoticeTableContainer.jsx
// 공지사항 목록을 표기하기 위한 컨테이너 컴포넌트
// NoticeContentContainer를 이용해서 공지사항의 내용물을 표기

import React, { useEffect, useState } from "react";
import NoticeContentContainer from "@components/notice/containers/NoticeContentContainer";
import { useNotices } from '@hooks/useNotices';
import PaginationComponent from '@components/common/PaginationComponent';
import { useRecoilState } from 'recoil';
import { noticesState } from '@recoil/atoms/noticesAtom';

export default function NoticeTableContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const { notices, totalPages, loading, error, refetchNotices } = useNotices(currentPage);
    const [recoilNotices, setRecoilNotices] = useRecoilState(noticesState);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // 목록 새로고침 함수
    const refreshList = () => {
        console.log("목록 새로고침");
        refetchNotices();
    };

    useEffect(() => {
        refetchNotices();
        setRecoilNotices(notices);
    }, [recoilNotices]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (

            <div>
                <NoticeContentContainer title={"[공지사항]"} data={notices} onRefresh={refreshList} />
                <PaginationComponent 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>   

    );
}