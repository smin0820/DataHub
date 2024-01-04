import { useState, useEffect } from 'react';
import ApiService from '@components/axios/ApiService';

// Q&A 상세 정보를 가져오는 훅
export const useQnaDetail = (qaId) => {
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        ApiService.fetchQnaDetail(qaId)
            .then(articleData => {
                setContent(articleData.content);
                setTitle(articleData.qa.qaTitle);
                setError(null);
            })
            .catch(err => {
                console.error('Q&A Detail 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [qaId]);

    return { content, title, loading, error };
};