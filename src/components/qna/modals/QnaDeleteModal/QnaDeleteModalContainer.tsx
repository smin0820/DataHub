// QnaDeleteModalContainer.tsx
// Q&A 삭제 모달 컨테이너 컴포넌트

import React from 'react';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import QnaDeleteModalPresenter from '@components/qna/modals/QnaDeleteModal/QnaDeleteModalPresenter';

interface QnaDeleteModalContainerProps {
    qaId: number;
    closeModal: () => void;
    onRefresh: () => void;
}

const QnaDeleteModalContainer: React.FC<QnaDeleteModalContainerProps> = ({ qaId, closeModal, onRefresh }) => {
    const userInfo = useRecoilValue(userState);
    const handleSuccess = () => {
        closeModal();
        onRefresh();
    }

    const handleSubmit = async () => {
        if(!userInfo || !userInfo.loginId) {
            console.error('사용자 정보가 없습니다.');
            return;
        }
        try {
            const response = await ApiService.deleteQna(qaId, userInfo.loginId);
            if (response) {
                handleSuccess();
            } else {
                alert("본인만 삭제할 수 있습니다!");
                closeModal();
            }
            handleSuccess();
        } catch(error) {
            console.error('Q&A 삭제 실패:', error);
        }   
    };

    return (
        <ModalComponent>
            <QnaDeleteModalPresenter
                closeModal={closeModal}
                handleSubmit={handleSubmit}
            />
        </ModalComponent>

    );
};

export default QnaDeleteModalContainer;