// AdminTableContainer.jsx
// '대기중 게시물'페이지를 보여주는 테이블 컨테이너입니다.

import React, { useEffect, useState } from "react";
import ApiService from '@components/axios/ApiService';
import AdminTablePresenter from '@components/admin/AdminTable/AdminTablePresenter';
import { useRecoilValue } from "recoil";
import { systemUploadState } from "@recoil/atoms/systemUploadStateAtom";

export default function AdminTableContainer() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const systemUpload = useRecoilValue(systemUploadState);

    useEffect(() => {
        ApiService.fetchWaitArticles(currentPage)
            .then(articleData => {
                setArticles(articleData.articles);
                setTotalPages(articleData.allPage);
            })
            .catch(error => console.error('Articles 요청 오류:', error));
    }, [currentPage, systemUpload]);

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