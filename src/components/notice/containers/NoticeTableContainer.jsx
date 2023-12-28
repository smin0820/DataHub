// NoticeTableContainer.jsx
// 공지사항 목록을 표기하기 위한 컨테이너 컴포넌트
// NoticeContentContainer를 이용해서 공지사항의 내용물을 표기

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoticeContentContainer from "@components/notice/containers/NoticeContentContainer";
import { usePagination } from '@hooks/usePagenation';
import { useArticles } from '@hooks/useArticles';
import NoticeDropdown from "@components/notice/containers/NoticeDropdown";


const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        &.pageButton {
            background: none;
            border: none;
            color: black;
            cursor: pointer;
            padding: 5px 10px;
            margin: 0 5px;
            text-decoration: none;

            &:hover {
            text-decoration: underline;
            }

            &:disabled {
            color: grey;
            }
        }
    }
`;


const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = usePagination(currentPage, totalPages);

    return (
        <PaginationContainer>
            {pageNumbers.map((page, index) => (
                page === '...' ? (
                    <span key={`separator-${index}`}>{page}</span>
                ) : (
                    <button
                        className="pageButton"
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                )
            ))}
        </PaginationContainer>
    );
};

export default function NoticeTableContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const { articles, totalPages, loading, error } = useArticles(currentPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            <NoticeContentContainer title={"[공지사항]"} data={articles} />
            <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>    
    );
}