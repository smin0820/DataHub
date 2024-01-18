import { useState, useEffect } from "react";
import ApiService from '@components/axios/ApiService';

export const useArticles = (currentPage) => {
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        ApiService.fetchWaitArticles(currentPage)
            .then(articleData => {
                setArticles(articleData.content);
                setTotalPages(articleData.totalPages);
                setError(null);
            })
            .catch(err => {
                console.error('Articles 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [currentPage]);

    return { articles, totalPages, loading, error };
};