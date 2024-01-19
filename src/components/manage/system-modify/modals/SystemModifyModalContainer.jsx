import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useNavigate } from 'react-router-dom';
import ModifySysModalPresenter from "@components/modify/modals/ModifySysModalPresenter"; 
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';

const SystemModifyModalContainer = ({ closeModal, userData}) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const handleUpdate = async () => {
    try {
      await ApiService.ModifyService(userData);
      closeModal();
      navigate('/manage');
    }
    catch (error) {
      console.error('Failed to update:', error);
    }
  }
  return (
    <ModalComponent>
      <ModifySysModalPresenter
        closeModal={closeModal}
        handleUpdate={handleUpdate}
      />
    </ModalComponent>

  );
};

SystemModifyModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};


export default SystemModifyModalContainer;