// NoticeNewArticle.jsx
// 새로운 공지사항을 등록하기 위한 버튼을 렌더링하는 컨테이너 컴포넌트

import React from 'react';
import styled from 'styled-components';
import useModal from '@hooks/useModal';
import QnaReigsterModal from '../modals/QnaReigsterModal';
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
            {isOpen && <QnaReigsterModal closeModal={closeModal} />}
        </Container>
    )
};