import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SystemContentContainer from "@components/common/containers/SystemContentContainer";
import ApiService from '@components/axios/ApiService';


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
    const [pageNumbers, setPageNumbers] = useState([]);
    const pageRangeDisplayed = 2;

    useEffect(() => {
        const newPageNumbers = [];

        // 첫 페이지와 구분자 추가
        if (currentPage > pageRangeDisplayed + 1) {
            newPageNumbers.push(1);
            if (currentPage > pageRangeDisplayed + 2) {
                newPageNumbers.push('...');
            }
        }

        // 현재 페이지 앞뒤로 2개 페이지 표시
        const startPage = Math.max(1, currentPage - pageRangeDisplayed);
        const endPage = Math.min(totalPages, currentPage + pageRangeDisplayed);
        for (let i = startPage; i <= endPage; i++) {
            newPageNumbers.push(i);
        }

        // 마지막 페이지와 구분자 추가
        if (currentPage < totalPages - pageRangeDisplayed) {
            if (currentPage < totalPages - pageRangeDisplayed - 1) {
                newPageNumbers.push('...');
            }
            newPageNumbers.push(totalPages);
        }

        setPageNumbers(newPageNumbers);
    }, [currentPage, totalPages]);

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


export default function AdminContentContainer() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0); 

    useEffect(() => {
        ApiService.fetchWaitArticles(currentPage)
            .then(articleData => {
                setArticles(articleData.articles);
                setTotalPages(articleData.allPage);
            })
            .catch(error => console.error('Articles 요청 오류:', error));
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <SystemContentContainer title={"[대기중 게시물]"} data={articles} />
            <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>    
    );
}