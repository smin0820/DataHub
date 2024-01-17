import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton } from '@styles/ModalStyles';

const QnaDeleteModalPresenter = ({ closeModal, handleSubmit } ) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="small" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>Q&A 삭제</ModalTitle>
                <ModalContent>선택하신 Q&A을 삭제 하시겠습니까?</ModalContent>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>삭제하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    ) 
};

export default QnaDeleteModalPresenter;