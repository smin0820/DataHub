import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '@hooks/useModal';

import QnaDeleteModal from '../modals/QnaDeleteModal';
import QnaEditModal from '../modals/QnaEditModal';
import { Dropmenu } from '@styles/BoardStyles';


export default function QnaDropdown({ qaId, onRefresh }) {
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
            {isEditOpen && <QnaEditModal qaId={qaId} onRefresh={onRefresh} closeModal={closeEditModal} />}
            {isDeleteOpen && <QnaDeleteModal qaId={qaId} onRefresh={onRefresh} closeModal={closeDeleteModal} />} 
        </>
    );
}
