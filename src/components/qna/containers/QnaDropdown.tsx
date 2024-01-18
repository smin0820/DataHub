// QnaDropdown.tsx
// Qna게시글 수정, 삭제 드롭다운 컴포넌트

import React from 'react';
import useModal from '@hooks/useModal';
import QnaDeleteModalContainer from '@components/qna/modals/QnaDeleteModal/QnaDeleteModalContainer';
import QnaEditModalContainer from '@components/qna/modals/QnaEditModal/QnaEditModalContainer';
import { Dropmenu } from '@styles/BoardStyles';

interface QnaDropdownProps {
    qaId: number;
    onRefresh: () => void;
}

const QnaDropdown: React.FC<QnaDropdownProps> = ({ qaId, onRefresh }) => {
    const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
    const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

    const handleEditClick = () => {
        openEditModal();
    };

    const handleDeleteClick = () => {
        openDeleteModal();
    };

    return (
        <>
            <Dropmenu>
                <ul>
                    <li onClick={handleEditClick}>수정</li>
                    <li onClick={handleDeleteClick}>삭제</li>
                </ul>
            </Dropmenu>
            {isEditOpen && <QnaEditModalContainer qaId={qaId} onRefresh={onRefresh} closeModal={closeEditModal} />}
            {isDeleteOpen && <QnaDeleteModalContainer qaId={qaId} onRefresh={onRefresh} closeModal={closeDeleteModal} />} 
        </>
    );
}

export default QnaDropdown;