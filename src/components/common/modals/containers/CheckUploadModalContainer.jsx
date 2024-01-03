import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';

const ModalOverlay = styled.div`
  &.modal-overlay {
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
    height: 700px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
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

  &.modal-close-button {
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
    flex-direction: row;
    margin-top: -10px;
    margin-left: 20px;
    margin-bottom: 20px;
    width: auto;
  }
`;

const RadioButton = styled.div`
  &.radio-button {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 20px;
    width: auto;

    label {
      margin-left: 10px;
    }

    .approve-label {
      color: #4dd392;
    }

    .reject-label {
      color: red;
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

const TextArea = styled.textarea`
  width: 80%;
  height: 150px;
  resize: none;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 20px;
  margin-bottom: 20px;
 
  &:focus {
    outline: none;
    border-color: #007fff;
  }

  &::placeholder {
    line-height: 150px;
    text-indent: 35%;
  }

  &:not(:placeholder-shown) {
    line-height: normal;
  }
`;

const CheckUploadModalContainer = ({ closeModal, articleId }) => {
    const [approval, setApproval] = useState('');
    const [declineDetail, setDeclineDetail] = useState('');
    const [file, setFile] = useState("");

    const handleRadioChange = (event) => {
      setApproval(event.target.value);
    };

    const handleDetailChange = (event) => {
      setDeclineDetail(event.target.value);
    };

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
      if(!articleId) {
        console.error("Article ID is not valid");
        return;
      }
      const formData = new FormData();
      formData.append('articleId', articleId);
      formData.append('approval', approval);
      formData.append('declineDetail', declineDetail);
      formData.append('file', file);
      // 현재로서는 파일이 없으면 검토결과가 업로드되지않음
      try {
        await ApiService.reviewArticle(formData);
        closeModal();
        console.log(articleId,"번 게시글 검토 완료");
        window.location.reload();
        // 추가적인 성공 처리 로직
      } catch (error) {
        console.error('Error submitting review:', error);
        // 에러 처리 로직
      }
    };

  return (
    <ModalOverlay className="modal-overlay" onClick={closeModal}>
      <ModalContainer className="modal-container" onClick={(e) => e.stopPropagation()}>
        <CloseButton className="modal-close-button" onClick={closeModal}>&times;</CloseButton>
        <ModalTitle>검토</ModalTitle>
        <ModalContent>검토 결과를 선택하여 주세요</ModalContent>
        <RadioGroup className="radio-group">
          <RadioButton className="radio-button">
            <input 
              type="radio" 
              id="approve"
              name="Result"
              value="승인"
              onChange={handleRadioChange}
              checked={ approval === "승인"}
            />
            <label className="approve-label" htmlFor="approve">승인</label>
          </RadioButton>
          <RadioButton className="radio-button">
            <input 
              type="radio"
              id="reject"
              name="Result"
              value="반려"
              onChange={handleRadioChange}
              checked={ approval === "반려"}
              />
            <label className="reject-label" htmlFor="reject">반려</label>
          </RadioButton>
        </RadioGroup>
        <ModalContent>검토 결과 상세내역을 입력하여 주세요</ModalContent>
        <TextArea 
          placeholder="상세 내역을 입력하세요." 
          value={declineDetail}
          onChange={handleDetailChange}
        />
        <FileUpload>
          <label>업로드 파일을 선택해주세요.</label>
          <input type="file" onChange={handleFileChange}/>
        </FileUpload>
        <ButtonGroup className="button-group">
          <button className="modal-group-button" onClick={closeModal}>취소</button>
          <button className="modal-group-button" onClick={handleSubmit}>확인</button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

CheckUploadModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired
};

// CheckUploadModalContainer.defaultProps = {
//   articleId: null
// };


export default CheckUploadModalContainer;