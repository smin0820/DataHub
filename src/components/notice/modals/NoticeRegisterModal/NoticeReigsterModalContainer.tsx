// NoticeRegisterModalContainer.tsx
// 공지사항 등록을 위한 모달 컨테이너 컴포넌트

import React, { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import NoticeRegisterModalPresenter from '@components/notice/modals/NoticeRegisterModal/NoticeRegisterModalPresenter';
import ModalComponent from '@components/common/ModalComponent';
import { noticesState } from '@recoil/atoms/noticesAtom';

interface NoticeRegisterModalContainerProps {
    closeModal: () => void;
}


const NoticeRegisterModalContainer: React.FC<NoticeRegisterModalContainerProps> = ({ closeModal }) => {
    const [Title, setTitle] = useState("");
    const [Body, setBody] = useState("");
    const userInfo = useRecoilValue(userState);
    const setNotices = useSetRecoilState(noticesState);


    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    const handleSuccess = () => {
        closeModal();
        setNotices([]);
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
        await ApiService.registerNotice(Title, Body, userInfo.loginId);
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