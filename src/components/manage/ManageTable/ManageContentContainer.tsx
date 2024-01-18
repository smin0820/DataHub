// ManageContentContainer.tsx
// '시스템 관리'페이지의 내용을 한줄씩 보여주는 컨테이너입니다.
// ManageTableContainer.tsx을 통해 받은 데이터를 테이블 형태로 보여줍니다.

import React from 'react';
import useIdModal from '@hooks/useIdModal';
import SystemDeleteModalContainer from '@components/manage/modals/SystemDeleteModalContainer';
import { Boarddiv, Tbodytr } from '@styles/BoardStyles';
import { SystemInfo } from '@@types/Systems';

interface ManageContentContainerProps {
  title: string;
  data: SystemInfo[];
  onRefresh: () => void;
}

const ManageContentContainer: React.FC<ManageContentContainerProps> = (props) => {
    const {title, data, onRefresh} = props;
    const { isOpen: isDeleteOpen, selectedId, openModal: openDeleteModal, closeModal: closeDeleteModal } = useIdModal();

    return (
      <Boarddiv className="manage">
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
              <Tbodytr key={i}>
                <td>{n.systemName}</td>
                <td>
                  <button onClick={() => openDeleteModal(n.systemId)}>삭제</button>
                </td>
                {isDeleteOpen && selectedId === n.systemId && (
                  <SystemDeleteModalContainer
                    systemId={selectedId}
                    onRefresh={onRefresh}
                    closeModal={closeDeleteModal}
                    systemName={n.systemName}
                  ></SystemDeleteModalContainer>
                )}
              </Tbodytr>
            ))}
          </tbody>
        </table>
      </Boarddiv>
    );
}

export default ManageContentContainer;