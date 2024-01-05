import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton } from "@styles/ModalStyles";

const NoticeViewModalPresenter = ({ closeModal, title, body }) => {
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