import useModal from '@hooks/useModal';
import React from 'react';
import styled from 'styled-components';
import SystemDeleteModal from './SystemDeleteModal';


const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    table {
        width: 100%;
        max-width: 1000px;
        border-collapse: collapse;
        border-spacing: 0;

        caption {
            text-align: left;
            margin-bottom: 30px;
            font-weight: bolder;
        }
        
        thead {
            background-color: #f3f6f9;
        }
        
        th {
            width: auto;
            text-align: left;
            padding: 7px 5px;
            font-weight: normal;
        }
        th:first-child {
            width: 60%;
        }
        th:nth-child(2){
            width: 20%;
        }
        td {
            width:auto;
            padding: 7px 5px;
        }
        td:last-child {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        button {
            padding: 2px 5px;
            color: white;
            background-color: #007fff;
            border: 1px solid #007fff;
            border-radius: 10px;
            font-size: medium;
            cursor: pointer;
            text-align: center;
        }
    }
`

const Tbodytr = styled.tr`
    border-bottom: 2px solid #e5eaf2;
    align-items: center;
    &:hover {
        background-color: #f3f6f9;
    }
`;

export default function ManageContentContainer(props) {
    const {title, data, onRefresh} = props;
    const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

    const handleDeleteSystem = () => {
        openDeleteModal();
    };
    return (
      <Container>
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
                  <button onClick={handleDeleteSystem}>삭제</button>
                </td>
                {isDeleteOpen && (
                  <SystemDeleteModal
                    systemId={n.systemId}
                    onRefresh={onRefresh}
                    closeModal={closeDeleteModal}
                  ></SystemDeleteModal>
                )}
              </Tbodytr>
            ))}
          </tbody>
        </table>
      </Container>
    );
}
