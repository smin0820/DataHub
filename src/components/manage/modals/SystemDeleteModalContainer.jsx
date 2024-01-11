// SystemDeleteModalContainer.jsx
// '시스템 삭제' 버튼을 눌렀을 때 나오는 모달 컨테이너입니다.

import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModalComponent from '@components/common/ModalComponent';
import SystemDeleteModalPresenter from '@components/manage/modals/SystemDeleteModalPresenter';
import { systemListState } from '@recoil/atoms/systemListStateAtom';

const SystemDeleteModalContainer = ({ systemId, closeModal, onRefresh }) => {
    const userInfo = useRecoilValue(userState);
    const setSystemList = useSetRecoilState(systemListState);
    
    const handleSuccess = () => {
        closeModal();
        setSystemList(systemId);
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
        } catch(error) {
            console.error('시스템 데이터 삭제 실패:', error);
        }   
    };

    return (
        <ModalComponent>
            <SystemDeleteModalPresenter
                closeModal={closeModal}
                handleSubmit={handleSubmit}
            />
        </ModalComponent>

    );
};

SystemDeleteModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default SystemDeleteModalContainer;