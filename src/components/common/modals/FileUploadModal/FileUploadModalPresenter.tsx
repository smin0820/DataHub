// FileUploadModalPresenter.jsx
// 파일을 업로드하는 모달 프레젠터입니다.

import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton, RadioGroup, RadioButton, FileUpload } from "@styles/ModalStyles";
import { DetailCategory } from '@@types/Categories';

interface FileUploadModalPresenterProps {
    closeModal: () => void;
    detailCategories: DetailCategory[];
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

const FileUploadModalPresenter: React.FC<FileUploadModalPresenterProps> = ({ closeModal, detailCategories, handleRadioChange, handleFileChange, handleSubmit }) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="medium" onClick={(e) => e.stopPropagation()}>
                <CloseButton className="ModalCloseButton" onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>파일 업로드</ModalTitle>
                <ModalContent>등록할 파일 종류를 선택하세요</ModalContent>
                <RadioGroup className="column-radiogroup">
                    {detailCategories.map((category, index) => (
                        <RadioButton key={category.detailCategoryId} className="file-radiobutton">
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
                    <label htmlFor="fileInput">업로드 파일을 선택해주세요.</label>
                    <input type="file" id="fileInput" onChange={handleFileChange} />
                </FileUpload>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소</button>
                    <button className="double" onClick={handleSubmit}>확인</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default FileUploadModalPresenter;
