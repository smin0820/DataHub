// NoticeNewArticle.jsx
// 새로운 공지사항을 등록하기 위한 버튼을 렌더링하는 컨테이너 컴포넌트

import React from 'react';
import styled from 'styled-components';
import useModal from '@hooks/useModal';
import NoticeRegisterModalContainer from '@components/notice/modals/NoticeRegisterModal/NoticeReigsterModalContainer';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import { Container, Buttondiv } from '@styles/CommonStyles';

export default function NoticeNewArticle() {
    const { isOpen, openModal, closeModal } = useModal();
    const userInfo = useRecoilValue(userState);
    const isAdmin = userInfo && userInfo.role === "ADMIN";

    return (
        <Container>
            <Buttondiv>
                {isAdmin && (
                    <button onClick={openModal}>
                        공지사항 등록
                    </button>
                )}
            </Buttondiv>
            {isOpen && <NoticeRegisterModalContainer closeModal={closeModal} />}
        </Container>
    )
};