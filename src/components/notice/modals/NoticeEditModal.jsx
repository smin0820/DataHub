import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useNoticeDetail } from '@hooks/useNoticeDetail';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';

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
            width: 300px;
            height: 35px;   
            &:first-child {
                margin-left: 0px;
                background-color: #7B91A7;
                color: black;
            }
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

const TextAreaContainer = styled.div`
    display: flex; 
    justify-content: center;
    width: 100%;
`;

const TitleTextArea = styled.textarea`
    width: 85%;
    height: 30px;
    resize: none;
    padding: 10px;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 5px;    
    &:focus {
        outline: none;
        border-color: #007fff;
    }
    &::placeholder {
        line-height: 30px;
        text-indent: 40%;
    }
    &:not(:placeholder-shown) {
        line-height: normal;
    }
`;

const BodyTextArea = styled.textarea`
    width: 85%;
    height: 300px;
    resize: none;
    padding: 10px;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 20px; 
    &:focus {
        outline: none;
        border-color: #007fff;
    }
    &::placeholder {
        line-height: 300px;
        text-indent: 40%;
    }
    &:not(:placeholder-shown) {
        line-height: normal;
    }
`;

const NoticeEditModal = ({ closeModal, noticeId, onRefresh }) => {
    const { title: fetchedTitle, body: fetchedBody, loading, error } = useNoticeDetail(noticeId);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const userInfo = useRecoilValue(userState);
    
    useEffect(() => {
        if (!loading && !error) {
            setTitle(fetchedTitle);
            setBody(fetchedBody);
        }
    }, [loading, error, fetchedTitle, fetchedBody]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleSuccess = () => {
        closeModal();
        onRefresh();
    };

    const handleSubmit = async () => {

        if (!userInfo || !userInfo.loginId) {
            console.error("사용자 정보가 없습니다.");
            return;
        }

        if (!title || !body) { 
            console.error("제목과 본문을 모두 입력해야 합니다.");
            return;
        }
        
        try {
            const response = await ApiService.editNotice(noticeId, title, body, userInfo.loginId);
            console.log("공지사항 수정 성공:", response);
            handleSuccess();
        } catch (error) {
            console.error("공지사항 수정 실패:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;



    return (
        <ModalOverlay className="modal-overlay" onClick={closeModal}>
            <ModalContainer className="modal-container" onClick={(e) => e.stopPropagation()}>
                <CloseButton className="modal-close-button" onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>공지사항 수정</ModalTitle>
                <ModalContent>제목</ModalContent>
                <TextAreaContainer>
                    <TitleTextArea 
                        placeholder="제목을 입력하세요."
                        value={title}
                        // onChange={(e) => setTitle(e.target.value)}
                        onChange={handleTitleChange}
                    />
                </TextAreaContainer>
                <ModalContent>본문</ModalContent>
                <TextAreaContainer>
                    <BodyTextArea 
                        placeholder="본문을 입력하세요."
                        value={body}
                        // onChange={(e) => setBody(e.target.value)}
                        onChange={handleBodyChange}
                    />
                </TextAreaContainer>
                <ButtonGroup className="button-group">
                    <button className="modal-group-button" onClick={closeModal}>취소하기</button>
                    <button className="modal-group-button" onClick={handleSubmit}>수정하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

NoticeEditModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default NoticeEditModal;