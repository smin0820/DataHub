import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';  
import FileUploadModalPresenter from './FileUploadModalPresenter'; // 경로에 맞게 조정 필요

const FileUploadModalContainer = ({ closeModal, detailCategories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [file, setFile] = useState(null);

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
          window.location.reload();
        })
        .catch(error => {
          console.error('업로드 실패:', error);
        });
    }
  };

  return (
    <FileUploadModalPresenter
      closeModal={closeModal}
      detailCategories={detailCategories}
      selectedCategoryId={selectedCategoryId}
      handleFileChange={handleFileChange}
      handleRadioChange={handleRadioChange}
      handleSubmit={handleSubmit}
    />
  );
};

FileUploadModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  detailCategories: PropTypes.array.isRequired
};

export default FileUploadModalContainer;