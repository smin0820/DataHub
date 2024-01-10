// NoticeDropdown.jsx
// 공지사항 목록의 편집 및 삭제를 위한 드롭다운 컴포넌트

import React from 'react';
import useModal from '@hooks/useModal';
import NoticeEditModalContainer from '@components/notice/modals/NoticeEditModal/NoticeEditModalContainer';
import NoticeDeleteModalContainer from '@components/notice/modals/NoticeDeleteModal/NoticeDeleteModalContainer';
import { Dropmenu } from '@styles/BoardStyles';

export default function NoticeDropdown({ noticeId, onRefresh }) {
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
            {isEditOpen && <NoticeEditModalContainer noticeId={noticeId} onRefresh={onRefresh} closeModal={closeEditModal} />}
            {isDeleteOpen && <NoticeDeleteModalContainer noticeId={noticeId} onRefresh={onRefresh} closeModal={closeDeleteModal} />} 
        </>
    );
}
