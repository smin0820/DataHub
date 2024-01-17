// FileDeleteModalContainer.tsx
// "대기"상태의 게시글 삭제를 위한 모달 컨테이너 컴포넌트

import React from 'react';
import ApiService from '@components/axios/ApiService';
import FileDeleteModalPresenter from '@components/common/modals/FileDeleteModal/FileDeleteModalPresenter';
import ModalComponent from '@components/common/ModalComponent';
import { useSetRecoilState } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';

interface FileDeleteModalContainerProps {
    closeModal: () => void;
    articleId: number;
}

const FileDeleteModalContainer: React.FC<FileDeleteModalContainerProps> = ({ closeModal, articleId }) => {
    const setSystemUpload = useSetRecoilState(systemUploadState);
    const currentTime = new Date().getTime();

    const handleSuccess = () => {
        closeModal();
        alert('파일이 삭제되었습니다.');
        setSystemUpload(currentTime);
    }

    const handleSubmit = async () => {

        try {
            await ApiService.deleteFile(articleId);
            handleSuccess();
        } catch (error) {
            console.error("파일 삭제 실패:", error);
        }
    };

    return (
        <ModalComponent>
            <FileDeleteModalPresenter  
                closeModal={closeModal}
                handleSubmit={handleSubmit}
            />
        </ModalComponent>
    );
};

export default FileDeleteModalContainer;