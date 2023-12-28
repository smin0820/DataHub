import { useState, useEffect } from 'react';

export const usePagination = (currentPage, totalPages, pageRangeDisplayed = 2) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const newPageNumbers = [];

        // Add first page and separator if needed
        if (currentPage > pageRangeDisplayed + 1) {
            newPageNumbers.push(1);
            if (currentPage > pageRangeDisplayed + 2) {
                newPageNumbers.push('...');
            }
        }

        // Add surrounding page numbers
        const startPage = Math.max(1, currentPage - pageRangeDisplayed);
        const endPage = Math.min(totalPages, currentPage + pageRangeDisplayed);
        for (let i = startPage; i <= endPage; i++) {
            newPageNumbers.push(i);
        }

        // Add last page and separator if needed
        if (currentPage < totalPages - pageRangeDisplayed) {
            if (currentPage < totalPages - pageRangeDisplayed - 1) {
                newPageNumbers.push('...');
            }
            newPageNumbers.push(totalPages);
        }

        setPageNumbers(newPageNumbers);
    }, [currentPage, totalPages, pageRangeDisplayed]);

    return pageNumbers;
};