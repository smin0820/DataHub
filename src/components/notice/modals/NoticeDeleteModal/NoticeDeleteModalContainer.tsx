// NoticeDeleteModalContainer.tsx
// 공지사항 삭제를 위한 모달 컨테이너 컴포넌트

import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import NoticeDeleteModalPresenter from '@components/notice/modals/NoticeDeleteModal/NoticeDeleteModalPresenter';
import ModalComponent from '@components/common/ModalComponent';

interface NoticeDeleteModalContainerProps {
    noticeId: number;
    closeModal: () => void;
    onRefresh: () => void;
}

const NoticeDeleteModalContainer: React.FC<NoticeDeleteModalContainerProps> = ({ noticeId, closeModal, onRefresh }) => {
    const userInfo = useRecoilValue(userState);
    
    const handleSuccess = () => {
        closeModal();
        onRefresh();
    }

    const handleSubmit = async () => {

        if (!userInfo || !userInfo.loginId) {
            console.error("사용자 정보가 없습니다.");
            return;
        }
        
        try {
            await ApiService.deleteNotice(noticeId, userInfo.loginId);
            handleSuccess();
        } catch (error) {
            console.error("공지사항 수정 실패:", error);
        }
    };

    return (
        <ModalComponent>
            <NoticeDeleteModalPresenter  
                closeModal={closeModal}
                handleSubmit={handleSubmit}
            />
        </ModalComponent>
    );
};

NoticeDeleteModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default NoticeDeleteModalContainer;