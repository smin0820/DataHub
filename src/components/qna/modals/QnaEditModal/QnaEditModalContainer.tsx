// QnaEditModalContainer.tsx
// Q&A 수정 모달 컨테이너 컴포넌트

import React, { useState, useEffect, ChangeEvent } from 'react';
import ApiService from '@components/axios/ApiService';
import { useQnaDetail } from '@hooks/useQnaDetail';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import QnaEditModalPresenter from './QnaEditModalPresenter';

interface QnaEditModalContainerProps {
    closeModal: () => void;
    qaId: number;
    onRefresh: () => void;
}

const QnaEditModalContainer: React.FC<QnaEditModalContainerProps> = ({ closeModal, qaId, onRefresh }) => {
    const { qa: fetchedQa, content: fetchedContent, loading, error } = useQnaDetail(qaId);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const userInfo = useRecoilValue(userState);

    useEffect(() => {
        if (!loading && !error) {
            if(fetchedQa){
                setTitle(fetchedQa.qaTitle);
                setContent(fetchedContent);    
            } else {
                console.error("Q&A 정보가 없습니다.");
            }
        }
    }, [loading, error, fetchedQa, fetchedContent]);

    
    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSuccess = () => {
        closeModal();
        onRefresh();
    };

    const handleSubmit = async () => {
        
        if (!userInfo || !userInfo.loginId) {
            console.error("사용자 정보가 없습니다.");
            return;
        }

        if (!title || !content) { 
            console.error("제목과 본문을 모두 입력해야 합니다.");
            return;
        }
        
        try {
            const response = await ApiService.editQna(userInfo.loginId, qaId, title, content);
            if (response) {
                console.log("Q&A 수정 성공:", response);
                handleSuccess();
            } else {
                alert("본인만 수정할 수 있습니다!");
                closeModal();
            }
        } catch (error) {
            console.error("Q&A 수정 실패:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ModalComponent>
            <QnaEditModalPresenter
                closeModal={closeModal}
                handleTitleChange={handleTitleChange}
                handleBodyChange={handleBodyChange}
                handleSubmit={handleSubmit}
                title={title}
                content={content}
            />
        </ModalComponent>

    );
};

export default QnaEditModalContainer;