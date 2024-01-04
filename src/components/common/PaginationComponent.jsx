import React from "react";
import styled from "styled-components";
import { usePagination } from "@hooks/usePagenation"; // Adjust the import path as needed

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

export default PaginationComponent;
