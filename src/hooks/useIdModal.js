import { useState } from 'react';

function useIdModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // 추가된 상태

    // 모달을 열 때 선택된 ID를 설정하는 함수
    const openModal = (id) => {
        setIsOpen(true);
        setSelectedId(id); // 선택된 ID를 상태에 저장
    };

    // 모달을 닫을 때 선택된 ID를 초기화하는 함수
    const closeModal = () => {
        setIsOpen(false);
        setSelectedId(null); // 선택된 ID 초기화
    };

    return { isOpen, selectedId, openModal, closeModal };
}

export default useIdModal;
