import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';  

const ModalOverlay = styled.div`
  &.modal-overlay{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 100%;
  }
`;

const ModalContainer = styled.div`
  &.modal-container {
    background-color: white;
    padding: 0px;
    border-radius: 10px;
    width: 600px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    position: relative;
      &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #3b4a59;
      position: absolute;
      top: 50px;
    }
  }
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: normal;
  text-align: left;
  margin-bottom: 40px;
  margin-top: 15px;
  margin-left: 20px;
`;

const ModalContent = styled.p`
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const ButtonGroup = styled.div`
  &.button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 10px 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;

    .modal-group-button {
      padding: 10px 30px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 10px;
      margin-right: 10px;
      width: 300px;
      height: 35px;
        
      &:first-child {
        margin-left: 0px;
        background-color: #7B91A7;
        color: black;
      }

      &:last-child {
        margin-right: 0px;
        background-color: #003a75;
        color: white;
      }
    }
  }
`;


const CloseButton = styled.button`

  &.ModalCloseButton {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 25px;
    top: 10px;
    font-size: 24px;
    width: 10px ;
    cursor: pointer;
    padding: 5px;
    line-height: 1;
    display: inline-block;
    transition: 0.3s;
    color: #000000;
  }
  &:hover {
    color: #007fff;
  }
`;

const RadioGroup = styled.div`
  &.radio-group {
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;

const RadioButton = styled.div`
  &.radio-button {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    label {
      margin-left: 10px;
    }
  }
`;

const FileUpload = styled.div`
  margin-top: 10px;
  margin-left: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="file"] {
    margin-top: 10px;
    display: block;
    padding: 5px;
    width: 250px;
    font-size: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }

  input[type="file"]::file-selector-button {
    background-color: #D9D9D9;
    border-radius: 5px;
    border: 1px solid #101418;
  }
`;

const FileUploadModalContainer = ({ closeModal, detailCategories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRadioChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedCategoryId && file) {
      // FileUploadService를 사용하여 파일 업로드
      ApiService.uploadFile(selectedCategoryId, file)
        .then(() => {
          // 업로드 성공 시 처리
          closeModal();
          window.location.reload();
        })
        .catch(error => {
          // 업로드 실패 시 처리
          console.error('업로드 실패:', error);
        });
    }
  };

  return (
    <ModalOverlay className="modal-overlay" onClick={closeModal}>
      <ModalContainer className="modal-container" onClick={(e) => e.stopPropagation()}>
      <CloseButton className="ModalCloseButton" onClick={closeModal}>&times;</CloseButton>
        <ModalTitle>파일 업로드</ModalTitle>
        <ModalContent>등록할 파일 종류를 선택하세요</ModalContent>
        {/* <RadioGroup className="radio-group">
          <RadioButton className="radio-button">
            <input type="radio" id="option1" name="FileType" value="option1" />
            <label htmlFor="option1">데이터베이스 정의서</label>
          </RadioButton>
          <RadioButton className="radio-button">
            <input type="radio" id="option2" name="FileType" value="option2" />
            <label htmlFor="option2">테이블 정의서</label>
          </RadioButton>
          <RadioButton className="radio-button">
            <input type="radio" id="option3" name="FileType" value="option3" />
            <label htmlFor="option3">컬럼 정의서</label>
          </RadioButton>
          <RadioButton className="radio-button">
            <input type="radio" id="option4" name="FileType" value="option4" />
            <label htmlFor="option4">ERD & 관계정의서</label>
          </RadioButton> */}
        <RadioGroup className="radio-group">
        {detailCategories.map((category, index) => (
          <RadioButton key={category.detailCategoryId} className="radio-button">
            <input
              type="radio"
              id={`option${index + 1}`}
              name="FileType"
              value={category.detailCategoryId}
              onChange={handleRadioChange}
            />
            <label htmlFor={`option${index + 1}`}>{category.detailCategoryName}</label>
          </RadioButton>
        ))}
        </RadioGroup>
        <FileUpload>
          <label>업로드 파일을 선택해주세요.</label>
          <input type="file" onChange={handleFileChange} />
        </FileUpload>
        <ButtonGroup className="button-group">
          <button className="modal-group-button" onClick={closeModal}>취소</button>
          <button className="modal-group-button" onClick={handleSubmit}>확인</button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

FileUploadModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  detailCategories: PropTypes.array.isRequired
};


export default FileUploadModalContainer;