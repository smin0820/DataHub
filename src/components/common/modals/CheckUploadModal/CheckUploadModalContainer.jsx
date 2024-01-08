import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import CheckUploadModalPresenter from '@components/common/modals/CheckUploadModal/CheckUploadModalPresenter';
import ModalComponent from '@components/common/ModalComponent';

const CheckUploadModalContainer = ({ closeModal, articleId }) => {
  const [approval, setApproval] = useState('');
  const [declineDetail, setDeclineDetail] = useState('');
  const [file, setFile] = useState("");

  const handleRadioChange = (event) => {
    setApproval(event.target.value);
  };

  const handleDetailChange = (event) => {
    setDeclineDetail(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if(!articleId) {
      console.error("Article ID is not valid");
      return;
    }
    const formData = new FormData();
    formData.append('articleId', articleId);
    formData.append('approval', approval);
    formData.append('declineDetail', declineDetail);
    formData.append('file', file);

    try {
      await ApiService.reviewArticle(formData);
      closeModal();
      console.log(articleId,"번 게시글 검토 완료");
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <ModalComponent>
      <CheckUploadModalPresenter
        closeModal={closeModal}
        approval={approval}
        declineDetail={declineDetail}
        handleRadioChange={handleRadioChange}
        handleDetailChange={handleDetailChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
    </ModalComponent>

  );
};

CheckUploadModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired
};

export default CheckUploadModalContainer;