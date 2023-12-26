import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminBoardContainer from "@components/admin/containers/AdminBoardContainer";
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
    const pageNumbers = [];

    const pageRangeDisplayed = 2;

    for (let i = Math.max(1, currentPage - pageRangeDisplayed); i <= Math.min(totalPages, currentPage + pageRangeDisplayed); i++) {
        pageNumbers.push(i);
    }

  // 마지막 페이지와 현재 페이지 그룹 사이의 구분자 추가
    if (currentPage + pageRangeDisplayed < totalPages) {
        pageNumbers.push('...'); // 구분자
        pageNumbers.push(totalPages); // 마지막 페이지
    }

    return (
        <PaginationContainer>
        {pageNumbers.map((page, index) => (
            page === '...' ? (
                    <span key={index}>{page}</span>
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
            <AdminBoardContainer title={"[대기중 게시물]"} data={articles} />
            <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>    
    );
}