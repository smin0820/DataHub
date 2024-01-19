// NoticeViewModalContainer.tsx
// 공지사항 상세보기를 위한 모달 컨테이너 컴포넌트

import React, { useState, useEffect } from 'react';
import { useNoticeDetail } from '@hooks/useNoticeDetail';
import ModalComponent from '@components/common/ModalComponent';
import NoticeViewModalPresenter from '@components/notice/modals/NoticeViewModal/NoticeViewModalPresenter';

interface NoticeViewModalContainerProps {
    noticeId: number;
    closeModal: () => void;
}

const NoticeViewModalContainer: React.FC<NoticeViewModalContainerProps> = ({ noticeId, closeModal }) => {
    const { title: fetchedTitle, body: fetchedBody, loading, error } = useNoticeDetail(noticeId);
    const [title, setTitle] = useState(''); // title 상태 초기화
    const [body, setBody] = useState(''); // body 상태 초기화

    // 로딩 및 에러 상태에 따라 title과 body 업데이트
    useEffect(() => {
        if (loading) {
            setTitle('Loading...');
            setBody('');
        } else if (error) {
            setTitle('Error');
            setBody(error);
        } else {
            setTitle(fetchedTitle);
            setBody(fetchedBody);
        }
    }, [loading, error, fetchedTitle, fetchedBody]);

    return (
        <ModalComponent>
            <NoticeViewModalPresenter
                closeModal={closeModal}
                title={title}
                body={body}
            />
        </ModalComponent>
    );
};

export default NoticeViewModalContainer;