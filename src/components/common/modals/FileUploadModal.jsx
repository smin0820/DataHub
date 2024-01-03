import React from 'react';
import PropTypes from 'prop-types';
import FileUploadModalContainer from '@components/common/modals/containers/FileUploadModalContainer';


const FileUploadModal = ({ closeModal, detailCategories }) => {
  return (
    <FileUploadModalContainer closeModal={closeModal} detailCategories={detailCategories} />
  );
};

FileUploadModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    detailCategories: PropTypes.array.isRequired
};

export default FileUploadModal;
