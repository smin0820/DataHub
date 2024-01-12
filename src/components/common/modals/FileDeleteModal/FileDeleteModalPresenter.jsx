// FileDeleteModalPresenter.jsx
// 공지사항 삭제를 위한 모달 프레젠터 컴포넌트

import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, CloseButton, ButtonGroup } from '@styles/ModalStyles';

const FileDeleteModalPresenter = ({ closeModal, handleSubmit }) => {
    return (
                <ModalOverlay onClick={closeModal}>
            <ModalContainer className='small' onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>파일 삭제</ModalTitle>
                <ModalContent>선택하신 파일을 삭제 하시겠습니까?</ModalContent>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>삭제하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default FileDeleteModalPresenter;