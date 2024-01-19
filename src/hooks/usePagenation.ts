import { useState, useEffect } from "react";

type usePaginationProps = {
  currentPage: number;
  totalPages: number;
};

export const usePagination = ({
  currentPage,
  totalPages,
}: usePaginationProps) => {
  const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);
  const pageRangeDisplayed = 5;
  useEffect(() => {
    const newPageNumbers: (number | string)[] = [];

    // Add first page and separator if needed
    if (currentPage > pageRangeDisplayed + 1) {
      newPageNumbers.push(1);
      if (currentPage > pageRangeDisplayed + 2) {
        newPageNumbers.push("...");
      }
    }

    // 주변 페이지 번호 추가
    const startPage = Math.max(1, currentPage - pageRangeDisplayed);
    const endPage = Math.min(totalPages, currentPage + pageRangeDisplayed);
    for (let i = startPage; i <= endPage; i++) {
      newPageNumbers.push(i);
    }

    // 마지막 페이지와 구분자 추가(필요한 경우)
    if (currentPage < totalPages - pageRangeDisplayed) {
      if (currentPage < totalPages - pageRangeDisplayed - 1) {
        newPageNumbers.push("...");
      }
      newPageNumbers.push(totalPages);
    }

    setPageNumbers(newPageNumbers);
  }, [currentPage, totalPages, pageRangeDisplayed]);

  return pageNumbers;
};
