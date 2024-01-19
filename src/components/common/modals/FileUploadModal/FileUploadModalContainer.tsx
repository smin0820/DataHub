// FileUploadModalContainer.tsx
// 파일을 업로드하는 모달 컨테이너입니다.

import React, { useState } from 'react';
import ApiService from '@components/axios/ApiService';  
import FileUploadModalPresenter from './FileUploadModalPresenter';
import ModalComponent from '@components/common/ModalComponent';
import { useSetRecoilState } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';

interface FileUploadModalContainerProps {
  closeModal: () => void;
  detailCategories: any[];
}

const FileUploadModalContainer: React.FC<FileUploadModalContainerProps> = ({ closeModal, detailCategories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const setSystemUpload = useSetRecoilState(systemUploadState);
  const currentTime = new Date().getTime();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryId(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (selectedCategoryId && file) {
      ApiService.uploadFile(selectedCategoryId, file)
        .then(() => {
          closeModal();
          alert('파일이 업로드 되었습니다.');
          setSystemUpload(currentTime);
        })
        .catch(error => {
          console.error('업로드 실패:', error);
        });
    }
  };

  return (
    <ModalComponent>
      <FileUploadModalPresenter
        closeModal={closeModal}
        detailCategories={detailCategories}
        handleFileChange={handleFileChange}
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
      />
    </ModalComponent>
  );
};

export default FileUploadModalContainer;