// QnaRegisterModalContainer.tsx
// Q&A 글쓰기 모달 컨테이너 컴포넌트

import React, { useState, ChangeEvent } from 'react';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import QnaRegisterModalPresenter from '@components/qna/modals/QnaRegisterModal/QnaRegisterModalPresenter';
import { qnasState } from '@recoil/atoms/qnasAtom';

interface QnaReigsterModalContainerProps {
    closeModal: () => void;
}

const QnaReigsterModalContainer: React.FC<QnaReigsterModalContainerProps> = ({ closeModal }) => {
    const [Title, setTitle] = useState<string>("");
    const [Body, setBody] = useState<string>("");
    const userInfo = useRecoilValue(userState);
    const setQnas = useSetRecoilState(qnasState);

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    const handleSuccess = () => {
        closeModal();
        setQnas([]);
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
        await ApiService.registerQna(userInfo.loginId, Title, Body);
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

export default QnaReigsterModalContainer;