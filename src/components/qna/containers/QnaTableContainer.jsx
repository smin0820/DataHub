// QnaTableContainer.jsx
// Q&A 목록을 표기하기 위한 컨테이너 컴포넌트
// QnaContentContainer를 이용해서 Q&A의 내용물을 표기

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePagination } from '@hooks/usePagenation';
import { useQnas } from '@hooks/useQnas';
import QnaContentContainer from "./QnaContentContainer";

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

export default function QnaTableContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const { qnas, totalPages, loading, error, refetchQnas } = useQnas(currentPage);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // 목록 새로고침 함수
    const refreshList = () => {
        refetchQnas();
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            <QnaContentContainer title={"[Q&A 게시판]"} data={qnas} onRefresh={refreshList} />
            <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>    
    );
}