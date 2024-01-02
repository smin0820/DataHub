import { useState, useEffect, useCallback } from "react";
import ApiService from '@components/axios/ApiService';

export const useNotices = (currentPage) => {
    const [notices, setNotices] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 데이터를 불러오는 함수
    const fetchNotices = useCallback(() => {
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

    // 컴포넌트 마운트시 및 currentPage가 변경될 때마다 fetchNotices 실행
    useEffect(() => {
        fetchNotices();
    }, [fetchNotices]);

    // refetchNotices 함수 반환
    return { notices, totalPages, loading, error, refetchNotices: fetchNotices };
};