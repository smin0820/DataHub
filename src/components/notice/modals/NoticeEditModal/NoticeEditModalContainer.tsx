// NoticeEditModalContainer.tsx
// 공지사항 수정을 위한 모달 컨테이너 컴포넌트

import React, { useState, useEffect, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useNoticeDetail } from '@hooks/useNoticeDetail';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import NoticeEditModalPresenter from '@components/notice/modals/NoticeEditModal/NoticeEditModalPresenter';
import ModalComponent from '@components/common/ModalComponent';

interface NoticeEditModalContainerProps {
    closeModal: () => void;
    noticeId: number;
    onRefresh: () => void;
}

const NoticeEditModalContainer: React.FC<NoticeEditModalContainerProps> = ({ closeModal, noticeId, onRefresh }) => {
    const { title: fetchedTitle, body: fetchedBody, loading, error } = useNoticeDetail(noticeId);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const userInfo = useRecoilValue(userState);
    
    useEffect(() => {
        if (!loading && !error) {
            setTitle(fetchedTitle);
            setBody(fetchedBody);
        }
    }, [loading, error, fetchedTitle, fetchedBody]);

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
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

        if (!title || !body) { 
            console.error("제목과 본문을 모두 입력해야 합니다.");
            return;
        }
        
        try {
            await ApiService.editNotice(noticeId, title, body, userInfo.loginId);
            handleSuccess();
        } catch (error) {
            console.error("공지사항 수정 실패:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ModalComponent>
            <NoticeEditModalPresenter  
                closeModal={closeModal}
                title={title}
                handleTitleChange={handleTitleChange}
                body={body}
                handleBodyChange={handleBodyChange}
                handleSubmit={handleSubmit}
            />
        </ModalComponent>
    );
};

NoticeEditModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default NoticeEditModalContainer;