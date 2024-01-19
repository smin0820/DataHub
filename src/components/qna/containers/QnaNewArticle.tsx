// QnaNewArticle.jsx
// 새로운 Qna게시글을 등록하기 위한 버튼을 렌더링하는 컨테이너 컴포넌트

import React from 'react';
import useModal from '@hooks/useModal';
import QnaReigsterModalContainer from '@components/qna/modals/QnaRegisterModal/QnaReigsterModalContainer';
import { Container, Buttondiv } from '@styles/CommonStyles';


export default function NoticeNewArticle() {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <Container>
            <Buttondiv>
                <button onClick={openModal}>
                    글쓰기
                </button>
            </Buttondiv>
            {isOpen && <QnaReigsterModalContainer closeModal={closeModal} />}
        </Container>
    )
};