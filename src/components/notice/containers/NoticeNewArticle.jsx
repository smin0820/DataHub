// NoticeNewArticle.jsx
// 새로운 공지사항을 등록하기 위한 버튼을 렌더링하는 컨테이너 컴포넌트

import React from 'react';
import styled from 'styled-components';
import useModal from '@hooks/useModal';
import NoticeRegisterModal from '@components/notice/modals/NoticeReigsterModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    div {
        width: 100%;
        max-width: 1000px;
    
        button {
            padding: 5px 10px;
            color: white;
            background-color: #007FFF;
            border: 1px solid #007FFF;
            border-radius: 10px;
            font-size: medium;
            cursor: pointer;
            float: right;
        }
    }
`;

export default function NoticeNewArticle() {
    const { isOpen, openModal, closeModal } = useModal();
    const userInfo = useRecoilValue(userState);
    const isAdmin = userInfo && userInfo.role === "ADMIN";

    return (
        <Container>
            <div>
                {isAdmin && (
                    <button onClick={openModal}>
                        공지사항 등록
                    </button>
                )}
            </div>
            {isOpen && <NoticeRegisterModal closeModal={closeModal} />}
        </Container>
    )
};