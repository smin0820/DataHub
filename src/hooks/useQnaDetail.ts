import { useState, useEffect, useCallback } from 'react';
import ApiService from '@components/axios/ApiService';
import { Qna, Reply, ReplyList } from '@@types/Articles';

// Q&A 상세 정보를 가져오는 훅
export const useQnaDetail = (qaId: number) => {
    // qa: { qaId, qaTitle, qaDate, username }
    const [qa, setQa] = useState<Qna>();
    // content
    const [content, setContent] = useState<string>("");
    // replys: { replyId, replyDate, replyContent, username }
    const [replys, setReplys] = useState<ReplyList>({ replys: [] } as ReplyList);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchQnaDetail = useCallback(() => {
        setLoading(true);
        ApiService.fetchQnaDetail(qaId)
            .then(articleData => {
                setContent(articleData.content);
                setQa(articleData.qa);
                setReplys(articleData.replys);
                setError("");
            })
            .catch(err => {
                console.error('Q&A Detail 요청 오류:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [qaId])

    useEffect(() => {
        fetchQnaDetail();
    }, [fetchQnaDetail]);

    return { content, loading, error, qa, replys, refetchQnaDetail: fetchQnaDetail };
};