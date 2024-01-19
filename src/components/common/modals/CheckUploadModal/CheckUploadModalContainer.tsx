// CheckUploadModalContainer.tsx
// 검토결과를 입력하는 모달 컨테이너입니다.

import React, { useState } from 'react';
import ApiService from '@components/axios/ApiService';
import CheckUploadModalPresenter from '@components/common/modals/CheckUploadModal/CheckUploadModalPresenter';
import ModalComponent from '@components/common/ModalComponent';
import { useSetRecoilState } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';

interface CheckUploadModalContainerProps {
  closeModal: () => void;
  articleId: number;
}

const CheckUploadModalContainer: React.FC<CheckUploadModalContainerProps> = ({ closeModal, articleId }) => {
  const [approval, setApproval] = useState<string>('');
  const [declineDetail, setDeclineDetail] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const setSystemUpload = useSetRecoilState(systemUploadState);
  const currentTime = new Date().getTime();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApproval(event.target.value);
  };

  const handleDetailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeclineDetail(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if(!articleId) {
      console.error("Article ID is not valid");
      return;
    }
    const formData = new FormData();
    formData.append('articleId', articleId.toString());
    formData.append('approval', approval);
    formData.append('declineDetail', declineDetail);
    if (file) {
      formData.append('file', file);
    }
    try {
      await ApiService.reviewArticle(formData);
      closeModal();
      alert("검토결과가 업로드 되었습니다.");
      setSystemUpload(currentTime)
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

export default CheckUploadModalContainer;