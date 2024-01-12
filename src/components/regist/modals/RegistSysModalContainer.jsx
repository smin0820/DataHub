import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '@components/common/ModalComponent';
import RegistSysModalPresenter from '@components/regist/modals/RegistSysModalPresenter';

const RegistSysModalContainer = ({ closeModal, inputValues }) => {
  const navigate = useNavigate();
  const handleRegistSys = async (event) => {
    event.preventDefault();
    try{
      const response = await ApiService.registerSystem(inputValues);
      if(response) {
        console.log('Register Success:', response);
        alert("시스템이 등록되었습니다.")
        closeModal();
        navigate('/manage');
      } else {
        alert("아이디가 중복되어 등록할 수 없습니다.")
        closeModal();
      }
    } catch (error) {
      console.error('Register Error:', error);
    }
  };

  return (
    <ModalComponent>
      <RegistSysModalPresenter
        closeModal={closeModal}
        handleRegistSys={handleRegistSys}
      />
    </ModalComponent>

  );
};

RegistSysModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
};


export default RegistSysModalContainer;