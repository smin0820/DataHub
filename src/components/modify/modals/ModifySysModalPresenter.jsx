import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, CloseButton, ButtonGroup } from '@styles/ModalStyles';

const ModifySysModalPresenter = ({ closeModal, handleUpdate}) => {
    return (
        <ModalOverlay onClick={closeModal}>
        <ModalContainer className="small" onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalTitle>시스템 정보 수정</ModalTitle>
            <ModalContent>선택하신 시스템 정보를 수정 하시겠습니까?</ModalContent>
            <ButtonGroup>
            <button className="double" onClick={closeModal}>취소하기</button>
            <button className="double" onClick={handleUpdate}>수정하기</button>
            </ButtonGroup>
        </ModalContainer>
        </ModalOverlay>
    );
};

export default ModifySysModalPresenter;