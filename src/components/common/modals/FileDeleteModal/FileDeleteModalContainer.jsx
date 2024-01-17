// FileDeleteModalContainer.jsx
// 공지사항 삭제를 위한 모달 컨테이너 컴포넌트

import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import FileDeleteModalPresenter from '@components/common/modals/FileDeleteModal/FileDeleteModalPresenter';
import ModalComponent from '@components/common/ModalComponent';
import { useSetRecoilState } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';

const FileDeleteModalContainer = ({ articleId, closeModal }) => {
    const setSystemUpload = useSetRecoilState(systemUploadState);
    const currentTime = new Date().getTime();

    const handleSuccess = () => {
        closeModal();
        alert('파일이 삭제되었습니다.');
        setSystemUpload(currentTime);
    }

    const handleSubmit = async () => {

        try {
            const response = await ApiService.deleteFile(articleId);
            console.log("파일 삭제 성공:", response);
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

FileDeleteModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default FileDeleteModalContainer;