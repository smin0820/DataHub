// NoticeViewModalPresenter.tsx
// 공지사항 상세보기를 위한 모달 프레젠터 컴포넌트

import React from "react";
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton } from "@styles/ModalStyles";

interface NoticeViewModalPresenterProps {
    closeModal: () => void;
    title: string;
    body: string;
}

const NoticeViewModalPresenter: React.FC<NoticeViewModalPresenterProps> = ({ closeModal, title, body }) => {
    return (
                <ModalOverlay onClick={closeModal}>
            <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>{title}</ModalTitle>
                <ModalContent>{body}</ModalContent>
                <ButtonGroup>
                    <button className="single" onClick={closeModal}>닫기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default NoticeViewModalPresenter;