import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import NoticeRegisterModalPresenter from '@components/notice/modals/NoticeRegisterModal/NoticeRegisterModalPresenter';
import ModalComponent from '@components/common/ModalComponent';

const NoticeRegisterModalContainer = ({ closeModal }) => {
    const [Title, setTitle] = useState("");
    const [Body, setBody] = useState("");
    const userInfo = useRecoilValue(userState);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleSuccess = () => {
        closeModal();
        window.location.reload();
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
        const response = await ApiService.registerNotice(Title, Body, userInfo.loginId);
        console.log("공지사항 등록 성공:", response);
        // 성공적으로 등록되었을 때의 추가 동작
        handleSuccess();
    } catch (error) {
        console.error("공지사항 등록 실패:", error);
        // 실패했을 때의 동작 처리
    }
};

    return (
        <ModalComponent>
            <NoticeRegisterModalPresenter
                closeModal={closeModal}
                Title={Title}
                handleTitleChange={handleTitleChange}
                Body={Body}
                handleBodyChange={handleBodyChange}
                handleSubmit={handleSubmit}
            />
        </ModalComponent>
    );
};

NoticeRegisterModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default NoticeRegisterModalContainer;