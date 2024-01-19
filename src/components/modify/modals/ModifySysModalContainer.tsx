// ModifySysModalContainer.tsx
// 시스템 정보 수정 페이지 확인 모달창을 위한 컨테이너 컴포넌트

import React from 'react';
import ApiService from '@components/axios/ApiService';
import { useNavigate } from 'react-router-dom';
import ModifySysModalPresenter from "@components/modify/modals/ModifySysModalPresenter"; 
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import { ModifyUserInfoRequest } from '@@types/UserInfo';

interface ModifySysModalContainerProps {
  closeModal: () => void;
  userData: ModifyUserInfoRequest;
}

const ModifySysModalContainer: React.FC<ModifySysModalContainerProps> = ({ closeModal, userData}) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);

  const handleUpdate = async () => {
    try {
      await ApiService.ModifyService(userData);
      closeModal();
      if (userInfo.role === 'ADMIN') {
        navigate('/admin');
      }
      else{
        navigate('/system');
      }
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

export default ModifySysModalContainer;