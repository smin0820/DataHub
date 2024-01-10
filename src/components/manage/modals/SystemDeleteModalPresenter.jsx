// SystemDeleteModalPresenter.jsx
// '시스템 삭제' 버튼을 눌렀을 때 나오는 모달 컴포넌트 프레젠터입니다.

import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, CloseButton, ButtonGroup } from '@styles/ModalStyles';

const SystemDeleteModalPresenter = ({ closeModal, handleSubmit }) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="small" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>시스템 삭제</ModalTitle>
                <ModalContent>선택하신 시스템을 삭제 하시겠습니까?</ModalContent>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>삭제하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default SystemDeleteModalPresenter;