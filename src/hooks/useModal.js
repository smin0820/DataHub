// src/hooks/useModal.js
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalStateAtom } from '@recoil/atoms/modalStateAtom';

function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const setModalState = useSetRecoilState(modalStateAtom);

    const openModal = () => {
        setIsOpen(true);
        setModalState(true); // 모달 상태를 true로 설정
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalState(false); // 모달 상태를 false로 설정
    };

    return { isOpen, openModal, closeModal };
}

export default useModal;
