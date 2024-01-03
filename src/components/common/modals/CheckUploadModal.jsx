import React from 'react';
import PropTypes from 'prop-types';
import CheckUploadModalContainer from '@components/common/modals/containers/CheckUploadModalContainer';


const CheckUploadModal = ({ closeModal, articleId }) => {
  return (
    <CheckUploadModalContainer closeModal={closeModal} articleId={articleId}/>
  );
};

CheckUploadModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired
};

export default CheckUploadModal;
