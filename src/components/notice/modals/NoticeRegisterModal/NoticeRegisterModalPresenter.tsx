// NoticeRegisterModalPresenter.tsx
// 공지사항 등록을 위한 모달 프레젠터 컴포넌트

import React from "react";
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton, TextAreaContainer, TextArea } from "@styles/ModalStyles";

interface NoticeRegisterModalPresenterProps {
    closeModal: () => void;
    Title: string;
    handleTitleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    Body: string;
    handleBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: () => void;
}

const NoticeRegisterModalPresenter: React.FC<NoticeRegisterModalPresenterProps> = ({ 
    closeModal,
    Title, handleTitleChange,
    Body, handleBodyChange,
    handleSubmit
}) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>새로운 공지사항 작성</ModalTitle>
                <ModalContent>제목</ModalContent>
                <TextAreaContainer>
                    <TextArea className="title-textarea"
                        placeholder="제목을 입력하세요." 
                        value={Title}
                        onChange={handleTitleChange}
                    />
                </TextAreaContainer>
                <ModalContent>본문</ModalContent>
                <TextAreaContainer>
                    <TextArea className="body-textarea"
                        placeholder="본문을 입력하세요." 
                        value={Body}
                        onChange={handleBodyChange}
                    />
                </TextAreaContainer>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>등록하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default NoticeRegisterModalPresenter;