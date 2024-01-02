import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNoticeDetail } from '@hooks/useNoticeDetail';

const ModalOverlay = styled.div`
    &.modal-overlay {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        max-width: 100%;
    }
`;

const ModalContainer = styled.div`
    &.modal-container {
        background-color: white;
        padding: 0px;
        border-radius: 10px;
        width: 600px;
        height: 600px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
        position: relative;
        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 1px;
            background-color: #7b91a7;
            position: absolute;
            top: 50px;
        }
    }
`;

const ModalTitle = styled.h2`
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    margin-bottom: 40px;
    margin-top: 15px;
    margin-left: 20px;
`;

const ModalContent = styled.p`
    font-size: 16px;
    text-align: left;
    margin-bottom: 5px;
    margin-left: 30px;
`;

const ButtonGroup = styled.div`
    &.button-group {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px 30px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: auto;
        .modal-group-button {
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
            margin-right: 10px;
            width: 520px;
            height: 35px;   
            &:last-child {
                margin-right: 0px;
                background-color: #003a75;
                color: white;
            }
        }
    }
`;


const CloseButton = styled.button`
    &.modal-close-button {
        background-color: transparent;
        border: none;
        position: absolute;
        right: 25px;
        top: 10px;
        font-size: 24px;
        width: 10px ;
        cursor: pointer;
        padding: 5px;
        line-height: 1;
        display: inline-block;
        transition: 0.3s;
        color: #000000;
    }
    &:hover {
        color: #007fff;
    }
`;



const NoticeViewModal = ({ noticeId, closeModal }) => {
    const { title: fetchedTitle, body: fetchedBody, loading, error } = useNoticeDetail(noticeId);
    const [title, setTitle] = useState(''); // title 상태 초기화
    const [body, setBody] = useState(''); // body 상태 초기화

    // 로딩 및 에러 상태에 따라 title과 body 업데이트
    useEffect(() => {
        if (loading) {
            setTitle('Loading...');
            setBody('');
        } else if (error) {
            setTitle('Error');
            setBody(error.message);
        } else {
            setTitle(fetchedTitle);
            setBody(fetchedBody);
        }
    }, [loading, error, fetchedTitle, fetchedBody]);

    return (
        <ModalOverlay className="modal-overlay" onClick={closeModal}>
            <ModalContainer className="modal-container" onClick={(e) => e.stopPropagation()}>
                <CloseButton className="modal-close-button" onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>{title}</ModalTitle> {/* Assuming these are the correct property names */}
                <ModalContent>{body}</ModalContent>
                <ButtonGroup className="button-group">
                    <button className="modal-group-button" onClick={closeModal}>닫기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

NoticeViewModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default NoticeViewModal;