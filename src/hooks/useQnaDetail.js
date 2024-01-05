import { useState, useEffect } from 'react';
import ApiService from '@components/axios/ApiService';

// Q&A 상세 정보를 가져오는 훅
export const useQnaDetail = (qaId) => {
    // qa: { qaId, qaTitle, qaDate, username }
    const [qa, setQa] = useState(null);
    // content
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        ApiService.fetchQnaDetail(qaId)
            .then(articleData => {
                setContent(articleData.content);
                setQa(articleData.qa);
                setError(null);
            })
            .catch(err => {
                console.error('Q&A Detail 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [qaId]);

    return { content, loading, error, qa };
};