import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton } from '@styles/ModalStyles';


const RegistSysModalPresenter = ({ closeModal, handleRegistSys }) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className='small' onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>시스템 등록</ModalTitle>
                <ModalContent>선택하신 시스템을 등록 하시겠습니까?</ModalContent>
                <ButtonGroup>
                <button className="double" onClick={closeModal}>취소하기</button>
                <button className="double" onClick={handleRegistSys}>등록하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    )
};

export default RegistSysModalPresenter;
    