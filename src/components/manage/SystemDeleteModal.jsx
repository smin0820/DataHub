import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';

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
        height: 200px;
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


const SystemDeleteModal = ({ systemId, closeModal, onRefresh }) => {
    const userInfo = useRecoilValue(userState);
    const handleSuccess = () => {
        closeModal();
        onRefresh();
    }

    const handleSubmit = async () => {
        if(!userInfo || !userInfo.loginId) {
            console.error('사용자 정보가 없습니다.');
            return;
        }
        try {
            const response = await ApiService.deleteSystemData(systemId);
            if (response) {
                console.log("시스템 데이터 삭제 성공:", response);
                const responseUser = await ApiService.deleteUser(systemId);
                if (responseUser) {
                    console.log("사용자 데이터 삭제 성공:", responseUser);
                    handleSuccess();
                } else {
                    closeModal();
                }
            } else {
                closeModal();
            }
            handleSuccess();
        } catch(error) {
            console.error('시스템 데이터 삭제 실패:', error);
        }   
    };

    return (
        <ModalComponent>
            <ModalOverlay className="modal-overlay" onClick={closeModal}>
                <ModalContainer className="modal-container" onClick={(e) => e.stopPropagation()}>
                    <CloseButton className="modal-close-button" onClick={closeModal}>&times;</CloseButton>
                    <ModalTitle>시스템 삭제</ModalTitle>
                    <ModalContent>선택하신 시스템을 삭제 하시겠습니까?</ModalContent>
                    <ButtonGroup className="button-group">
                        <button className="modal-group-button" onClick={closeModal}>취소하기</button>
                        <button className="modal-group-button" onClick={handleSubmit}>삭제하기</button>
                    </ButtonGroup>
                </ModalContainer>
            </ModalOverlay>
        </ModalComponent>

    );
};

SystemDeleteModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default SystemDeleteModal;