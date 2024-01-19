// SystemDeleteModalContainer.tsx
// '시스템 삭제' 버튼을 눌렀을 때 나오는 모달 컨테이너입니다.

import React from 'react';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import SystemDeleteModalPresenter from '@components/manage/modals/SystemDeleteModalPresenter';
import { systemListState } from '@recoil/atoms/systemListStateAtom';

interface SystemDeleteModalContainerProps {
    systemId: number;
    closeModal: () => void;
    onRefresh: () => void;
    systemName: string;
}

const SystemDeleteModalContainer: React.FC<SystemDeleteModalContainerProps> = ({ 
    systemId,
    closeModal,
    onRefresh,
    systemName
}) => {
    const userInfo = useRecoilValue(userState);
    // Sidebar에게 새로고침 신호를 보내기 위한 state
    const setSystemList = useSetRecoilState(systemListState);
    let systemIdList: [] = [];

    const handleSuccess = () => {
        closeModal();
        // Sidebar에게 새로고침 신호를 보냄
        setSystemList(systemIdList);
        onRefresh();
    }

    const handleSubmit = async () => {
        if(!userInfo || !userInfo.loginId) {
            console.error('사용자 정보가 없습니다.');
            return;
        }
        try {
            // 시스템 데이터 삭제시 반드시 사용자 데이터부터 삭제해야 함
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
        } catch(error: any) {
            console.error('시스템 데이터 삭제 실패:', error);
        }   
    };

    return (
        <ModalComponent>
            <SystemDeleteModalPresenter
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                systemName={systemName}
            />
        </ModalComponent>

    );
};

export default SystemDeleteModalContainer;