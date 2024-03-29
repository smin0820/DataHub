// PaginationComponent.jsx
// 페이지네이션을 구현하는 컴포넌트입니다.

import React from "react";
import styled from "styled-components";
import { usePagination } from "@hooks/usePagenation";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        &.pageButton {
            background: none;
            border: none;
            color: grey;
            cursor: pointer;
            padding: 5px 10px;
            margin: 0 5px;
            text-decoration: none;

            &:hover {
            text-decoration: underline;
            }

            &:disabled {
            color: black;
            }
        }
    }
`;

type PaginationComponentProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const PaginationComponent = ({ 
    currentPage,
    totalPages,
    onPageChange
} : PaginationComponentProps) => {
    const pageNumbers = usePagination({ currentPage, totalPages });

    return (
        <PaginationContainer>
            {pageNumbers.map((page, index) => (
                page === '...' ? (
                    <span key={`separator-${index}`}>{page}</span>
                ) : (
                    <button
                        className="pageButton"
                        key={page}
                        onClick={() => onPageChange(Number(page))}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                )
            ))}
        </PaginationContainer>
    );
};

export default PaginationComponent;
