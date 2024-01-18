// RegistSysModalContainer.tsx
// 새로운 시스템 등록 페이지 확인 모달창을 위한 컨테이너 컴포넌트

import React from 'react';
import ApiService from '@components/axios/ApiService';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '@components/common/ModalComponent';
import RegistSysModalPresenter from '@components/manage/regist/modals/RegistSysModalPresenter';
import { RegistUserInfo } from '@@types/UserInfo';

interface RegistSysModalContainerProps {
  closeModal: () => void;
  inputValues: RegistUserInfo;
}

const RegistSysModalContainer: React.FC<RegistSysModalContainerProps> = ({ closeModal, inputValues }) => {
  const navigate = useNavigate();

  const handleRegistSys = async () => {
    try{
      const response = await ApiService.registerSystem(inputValues);
      if(response) {
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

export default RegistSysModalContainer;