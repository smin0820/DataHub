// SystemDeleteModalPresenter.tsx
// '시스템 삭제' 버튼을 눌렀을 때 나오는 모달 컴포넌트 프레젠터입니다.

import React, { useState, ChangeEvent } from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ModalInput, CloseButton, ButtonGroup, DeleteButton } from '@styles/ModalStyles';

interface SystemDeleteModalPresenterProps {
    closeModal: () => void;
    handleSubmit: () => void;
    systemName: string;
}

const SystemDeleteModalPresenter: React.FC<SystemDeleteModalPresenterProps> = ({ 
    closeModal,
    handleSubmit,
    systemName
}) => {
    const [inputText, setInputText] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }
    
    const isDeleteButtonDisabled = inputText !== systemName;

    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="small" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>선택하신 {systemName}을 삭제 하시겠습니까?</ModalTitle>
                <ModalContent>시스템을 삭제하시려면 "{systemName}"을 입력해 주세요</ModalContent>
                <ModalInput type="text" value={inputText} onChange={handleInputChange} />
                <ButtonGroup>
                    <button className="deleteModal" onClick={closeModal}>취소하기</button>
                    <DeleteButton className="deleteModal" onClick={handleSubmit} disabled={isDeleteButtonDisabled}>삭제하기</DeleteButton>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default SystemDeleteModalPresenter;