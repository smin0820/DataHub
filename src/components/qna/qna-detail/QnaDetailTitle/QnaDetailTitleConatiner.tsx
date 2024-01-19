// QnaDetailTitle.tsx
// Qna의 세부사항을 보여주는 컴포넌트입니다.

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QnaDetailTitlePresenter from '@components/qna/qna-detail/QnaDetailTitle/QnaDetailTitlePresenter';
import { useQnaDetail } from '@hooks/useQnaDetail';
import { Qna } from '@@types/Articles';

const QnaDetailTitleContainer = () => {
    const location = useLocation();
    const commentInfo = {...location.state};
    const {content: fetchedContent, qa: fetchedQa, loading, error } = useQnaDetail(commentInfo.selectedqaId);
    const [qa, setQa] = useState<Qna>({qaId: -1, qaTitle: 'loading', qaDate: 'loading', username: 'loading' });
    const [title, setTitle] = useState<string>('');
    const [conetent, setConent] = useState<string>('');

    useEffect(() => {
      if (loading) {
          setTitle('Loading...');
          setConent('');
      } else if (error) {
          setTitle('Error');
          setConent(error);
      } else {
        if(fetchedQa){
          setTitle(fetchedQa.qaTitle);
          setConent(fetchedContent);
          setQa(fetchedQa);
        }
          
      }
  }, [loading, error, fetchedContent, fetchedQa]);

    return (
        <QnaDetailTitlePresenter title={title} qa={qa} content={conetent}/>
    );
}

export default QnaDetailTitleContainer;