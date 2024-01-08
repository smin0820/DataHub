import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, CloseButton, ButtonGroup } from '@styles/ModalStyles';

const NoticeDeleteModalPresenter = ({ closeModal, handleSubmit }) => {
    return (
                <ModalOverlay onClick={closeModal}>
            <ModalContainer className='small' onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>공지사항 삭제</ModalTitle>
                <ModalContent>선택하신 공지사항을 삭제 하시겠습니까?</ModalContent>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>삭제하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default NoticeDeleteModalPresenter;