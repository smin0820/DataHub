// useNoticeDetail.ts
// 공지사항 상세 정보를 가져오는 훅

import React, { useState, useEffect } from 'react';
import ApiService from '@components/axios/ApiService';

// 공지사항 상세 정보를 가져오는 훅
export const useNoticeDetail = (noticeId: number) => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        ApiService.fetchNoticeDetail(noticeId)
            .then(articleData => {
                setTitle(articleData.noticeTitle);
                setBody(articleData.noticeContent);
                setError("");
            })
            .catch(err => {
                console.error('Notice Detail 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [noticeId]);

    return { title, body, loading, error };
};