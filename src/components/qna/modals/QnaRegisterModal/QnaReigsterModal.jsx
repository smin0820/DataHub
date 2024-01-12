import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import QnaRegisterModalPresenter from '@components/qna/modals/QnaRegisterModal/QnaRegisterModalPresenter';
import { qnasState } from '@recoil/atoms/qnasAtom';


const QnaReigsterModal = ({ closeModal }) => {
    const [Title, setTitle] = useState("");
    const [Body, setBody] = useState("");
    const userInfo = useRecoilValue(userState);
    const setQnas = useSetRecoilState(qnasState);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleSuccess = () => {
        closeModal();
        setQnas(0);
    };

    const handleSubmit = async () => {
    if(!Title || !Body) { 
        console.error("제목과 본문을 모두 입력해야 합니다.");
        return;
    }

    if (!userInfo || !userInfo.loginId) {
        console.error("사용자 정보가 없습니다.");
        return;
    }

    try {
        const response = await ApiService.registerQna(userInfo.loginId, Title, Body);
        // 성공적으로 등록되었을 때의 추가 동작
        handleSuccess();
    } catch (error) {
        console.error("Qna 글쓰기 실패:", error);
        // 실패했을 때의 동작 처리
    }
};

    return (
        <ModalComponent>
            <QnaRegisterModalPresenter
                closeModal={closeModal}
                Title = {Title}
                handleTitleChange = {handleTitleChange}
                Body = {Body}
                handleBodyChange = {handleBodyChange}
                handleSubmit = {handleSubmit}
            />
        </ModalComponent>
        
    );
};

QnaReigsterModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default QnaReigsterModal;