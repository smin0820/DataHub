// FileUploadModalContainer.jsx
// 파일을 업로드하는 모달 컨테이너입니다.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';  
import FileUploadModalPresenter from './FileUploadModalPresenter';
import ModalComponent from '@components/common/ModalComponent';
import { useSetRecoilState } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';

const FileUploadModalContainer = ({ closeModal, detailCategories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [file, setFile] = useState(null);
  const setSystemUpload = useSetRecoilState(systemUploadState);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRadioChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedCategoryId && file) {
      ApiService.uploadFile(selectedCategoryId, file)
        .then(() => {
          closeModal();
          alert('파일이 업로드 되었습니다.');
          setSystemUpload(selectedCategoryId+file);
        })
        .catch(error => {
          console.error('업로드 실패:', error);
        });
    }
  };

  return (
    <ModalComponent>
      <FileUploadModalPresenter
        closeModal={closeModal}
        detailCategories={detailCategories}
        selectedCategoryId={selectedCategoryId}
        handleFileChange={handleFileChange}
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
      />
    </ModalComponent>
  );
};

FileUploadModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  detailCategories: PropTypes.array.isRequired
};

export default FileUploadModalContainer;