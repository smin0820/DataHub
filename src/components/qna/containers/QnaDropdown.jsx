import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '@hooks/useModal';

import QnaDeleteModalContainer from '@components/qna/modals/QnaDeleteModal/QnaDeleteModalContainer';
import QnaEditModal from '../modals/QnaEditModal';

const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 20;
    top: 2.45rem;
    right: 0.3rem;
    width: 5rem;
    border: 1px solid #E5EAF2;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  /* 그림자 효과 추가 */
    background-color: white;

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        padding-right: 20px;
        margin: 0;
        padding: 0;
    }
    li {
        cursor: pointer;
        padding: 0.3rem 1.3rem;
        border-bottom: 1px solid #E5EAF2; /* 항목 사이에 구분선을 추가 */
        &:hover {
            background-color: #e0e0e0;  // 호버 시 배경색 변경
            color: #4DBDE5;  // 호버 시 글자색 변경
            font-weight: bold; // 호버 시 폰트 굵기 변경
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);  // 호버 시 그림자 효과 추가
        }
        &:last-child {
            border-bottom: none; /* 마지막 항목에는 구분선을 제거 */
        }
    }
    &.active {
        color: #4DBDE5;
    }
`

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
            {isDeleteOpen && <QnaDeleteModalContainer qaId={qaId} onRefresh={onRefresh} closeModal={closeDeleteModal} />} 
        </>
    );
}
