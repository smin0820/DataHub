import { useState, useEffect } from "react";
import ApiService from '@components/axios/ApiService';

export const useNotices = (currentPage) => {
    const [notices, setNotices] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        ApiService.fetchNotices(currentPage)
            .then(articleData => {
                setNotices(articleData.notices);
                setTotalPages(articleData.allPage);
                setError(null);
            })
            .catch(err => {
                console.error('Notices 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [currentPage]);

    return { notices, totalPages, loading, error };
};