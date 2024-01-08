import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNoticeDetail } from '@hooks/useNoticeDetail';
import ModalComponent from '@components/common/ModalComponent';
import NoticeViewModalPresenter from '@components/notice/modals/NoticeViewModal/NoticeViewModalPresenter';


const NoticeViewModalContainer = ({ noticeId, closeModal }) => {
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
            setBody(error.message);
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

NoticeViewModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default NoticeViewModalContainer;