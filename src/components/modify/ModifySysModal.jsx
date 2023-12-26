import React from 'react';
import PropTypes from 'prop-types';
import ModifySysModalContainer from '@components/modify/containers/ModifySysModalContainer';


const ModifySysModal = ({ closeModal, userData }) => {
    return (
      <ModifySysModalContainer closeModal={closeModal} userData={userData} />
    );
  };

ModifySysModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired
};

export default ModifySysModal;
