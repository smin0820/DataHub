import React, { useEffect, useState } from "react";
import ApiService from '@components/axios/ApiService';
import AdminTablePresenter from './AdminTablePresenter';

export default function AdminTableContainer() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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
        <AdminTablePresenter
            articles={articles}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    );
}