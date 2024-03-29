// ManageContentContainer.tsx
// '시스템 관리'페이지의 내용을 한줄씩 보여주는 컨테이너입니다.
// ManageTableContainer.tsx을 통해 받은 데이터를 테이블 형태로 보여줍니다.

import React from 'react';
import useIdModal from '@hooks/useIdModal';
import SystemDeleteModalContainer from '@components/manage/modals/SystemDeleteModalContainer';
import { SystemInfo } from '@@types/Systems';
import { useNavigate } from 'react-router-dom';
import * as S from "@components/manage/ManageTable/styles";

interface ManageContentContainerProps {
  title: string;
  data: SystemInfo[];
  onRefresh: () => void;
}

const ManageContentContainer: React.FC<ManageContentContainerProps> = (props) => {
    const {title, data, onRefresh} = props;
    const { isOpen: isDeleteOpen, selectedId, openModal: openDeleteModal, closeModal: closeDeleteModal } = useIdModal();
    const naviage = useNavigate();
    return (
      <S.Boarddiv className="manage">
        <table>
          <caption>{title}</caption>
          <thead>
            <tr>
              <th>시스템명</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((n, i) => (
              <S.Tbodytr key={i}>
                <td>{n.systemName}</td>
                <td>
                  <button
                    onClick={() =>
                      naviage("/system-modify", {
                        state: {
                          selectedsystemId: n.systemId,
                          selectedsystemName: n.systemName,
                        },
                      })
                    }
                  >
                    수정
                  </button>
                  <button onClick={() => openDeleteModal(n.systemId)}>
                    삭제
                  </button>
                </td>
                {isDeleteOpen && selectedId === n.systemId && (
                  <SystemDeleteModalContainer
                    systemId={selectedId}
                    onRefresh={onRefresh}
                    closeModal={closeDeleteModal}
                    systemName={n.systemName}
                  ></SystemDeleteModalContainer>
                )}
              </S.Tbodytr>
            ))}
          </tbody>
        </table>
      </S.Boarddiv>
    );
}

export default ManageContentContainer;