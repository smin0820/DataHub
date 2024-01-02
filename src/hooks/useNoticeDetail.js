import { useState, useEffect } from 'react';
import ApiService from '@components/axios/ApiService';

// 공지사항 상세 정보를 가져오는 훅
export const useNoticeDetail = (noticeId) => {
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        ApiService.fetchNoticeDetail(noticeId)
            .then(articleData => {
                setTitle(articleData.noticeTitle);
                setBody(articleData.noticeContent);
                setError(null);
            })
            .catch(err => {
                console.error('Notice Detail 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [noticeId]);

    return { title, body, loading, error };
};