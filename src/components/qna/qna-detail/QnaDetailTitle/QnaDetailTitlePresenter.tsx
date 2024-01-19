// QnaDetailTitlePresenter.tsx
// Qna의 기존 게시글을 보여주는 프레젠터 컴포넌트입니다.

import React from 'react';
import { QnaTitleContainer } from '@styles/BoardStyles';
import { Qna } from '@@types/Articles';

type QnaDetailTitlePresenterProps = {
    title: string;
    qa: Qna;
    content: string;
}

const QnaDetailTitlePresenter = ({title, qa, content}:QnaDetailTitlePresenterProps) => {
    
    return (
        <QnaTitleContainer>
            <div>
            <div>
                <h1>{title}</h1>
                <p>{qa.username}</p>
                <p>{qa.qaDate}</p>
            </div>
            
            <div>
                <p>{content}</p>
            </div>
            </div>
        </QnaTitleContainer>
    );
}

export default QnaDetailTitlePresenter;