// ModifySysModalPresenter.tsx
// 시스템 정보 수정 페이지 확인 모달창을 위한 프레젠터 컴포넌트

import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, CloseButton, ButtonGroup } from '@styles/ModalStyles';

interface ModifySysModalPresenterProps {
    closeModal: () => void;
    handleUpdate: () => void;
}
const ModifySysModalPresenter: React.FC<ModifySysModalPresenterProps> = ({ 
    closeModal,
    handleUpdate
}) => {
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