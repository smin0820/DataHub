// CheckUploadModalPresenter.tsx
// 검토결과를 입력하는 모달 프레젠터입니다.

import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton, RadioGroup, RadioButton, TextArea, FileUpload, TextAreaContainer} from "@styles/ModalStyles";

interface CheckUploadModalPresenterProps {
    closeModal: () => void;
    approval: string;
    declineDetail: string;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDetailChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

const CheckUploadModalPresenter: React.FC<CheckUploadModalPresenterProps> = ({ closeModal, approval, declineDetail, handleRadioChange, handleDetailChange, handleFileChange, handleSubmit }) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>검토</ModalTitle>
                <ModalContent>검토 결과를 선택하여 주세요</ModalContent>
                <RadioGroup className="row-radiogroup">
                    <RadioButton className="check-radiobutton">
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
                    <RadioButton className="check-radiobutton">
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
                <TextAreaContainer>
                    <TextArea className='check-textarea'
                        placeholder="상세 내역을 입력하세요." 
                        value={declineDetail}
                        onChange={handleDetailChange}
                    />
                </TextAreaContainer>
                <FileUpload>
                    <label htmlFor="fileInput">업로드 파일을 선택해주세요.</label>
                    <input type="file" id="fileInput" onChange={handleFileChange}/>
                </FileUpload>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소</button>
                    <button className="double" onClick={handleSubmit}>확인</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default CheckUploadModalPresenter;
