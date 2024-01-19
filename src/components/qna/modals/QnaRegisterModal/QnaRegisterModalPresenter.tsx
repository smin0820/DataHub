// QnaRegisterModalPresenter.tsx
// Q&A 등록 모달 프레젠터 컴포넌트

import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, CloseButton, ModalContent, ButtonGroup, TextAreaContainer, TextArea } from '@styles/ModalStyles';

interface QnaRegisterModalPresenterProps {
    closeModal: () => void;
    Title: string;
    handleTitleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    Body: string;
    handleBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: () => void;
}

const QnaRegisterModalPresenter: React.FC<QnaRegisterModalPresenterProps> = ({
    closeModal,
    Title, handleTitleChange,
    Body, handleBodyChange,
    handleSubmit
}) => {
    return (
            <ModalOverlay onClick={closeModal}>
                <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>
                    <ModalTitle>새로운 Qna 작성</ModalTitle>
                    <ModalContent>제목</ModalContent>
                    <TextAreaContainer>
                        <TextArea className='title-textarea'
                            placeholder="제목을 입력하세요." 
                            value={Title}
                            onChange={handleTitleChange}
                        />
                    </TextAreaContainer>
                    <ModalContent>본문</ModalContent>
                    <TextAreaContainer>
                        <TextArea className='body-textarea'
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
    )
};

export default QnaRegisterModalPresenter;