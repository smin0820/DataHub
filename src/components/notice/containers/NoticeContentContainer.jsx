// NoticeContentContainer.jsx
// 공지사항 목록의 내용물을 표기하기 위한 컨테이너 컴포넌트

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NoticeDropdown from "@components/notice/containers/NoticeDropdown";
import useDropdown from "@hooks/useDropdown";
import NoticeViewModal from "@components/notice/modals/NoticeViewModal";
import useIdModal from "@hooks/useIdModal";

const Boarddiv = styled.div`
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
        width: 70%;
    }
    th:nth-child(2){
        width:15%;
    }
    td {
        width:auto;
        padding: 7px 5px;
        cursor: pointer;
            span {
            padding: 0;
            margin: 0;
            cursor: pointer;
            border-radius: 10px;
            padding: 5px 8px;
            background-color:#F1F1F1;
            font-size: medium;
        }
    }

    td:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;


const Tbodytr = styled.tr`
    border-bottom: 2px solid #e5eaf2;
    align-items: center;
    &:hover {
        background-color: #f3f6f9;
    }
`;

export default function NoticeContentContainer(props) {
    const { title, data = [], onRefresh } = props;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isAdmin = userInfo && userInfo.role === "ADMIN";
    const { currentOpenDropdown, toggleDropdown, dropdownRefs, closeDropdown } = useDropdown();
    const { isOpen: isViewOpen, selectedId, openModal: openViewModal, closeModal: closeViewModal } = useIdModal();

    return (
        <Boarddiv>
            <table>
                <caption>{title}</caption>
                <thead>
                <tr>
                    <th>제목</th>
                    <th>업로드 일시</th>
                    {/* <th>차수</th>  */}
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {data.map((n, i) => (
                    <Tbodytr key={i} onClick={() => openViewModal(n.noticeId)}>
                    <td>
                        {n.noticeTitle}
                    </td>
                    <td>
                        {n.noticeDate}
                    </td>
                    {/* <td>{n.noticeId}</td> */}
                    <td style={{ position: 'relative' }} ref={el => dropdownRefs.current.set(n.noticeId, el)} onClick={(event) => event.stopPropagation()}>
                        {isAdmin && (
                            <>
                                <span onClick={() => toggleDropdown(n.noticeId)}>
                                    편집 {currentOpenDropdown === n.noticeId ? "∧" : "∨"}
                                </span>
                                {currentOpenDropdown === n.noticeId && <NoticeDropdown noticeId={n.noticeId} onRefresh={onRefresh} />}
                            </>
                        )}
                    </td>
                    </Tbodytr>   
                ))}
                </tbody>
            </table>
            {isViewOpen && <NoticeViewModal noticeId = {selectedId} closeModal={closeViewModal} />}
        </Boarddiv>
    );
}


NoticeContentContainer.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
};

NoticeContentContainer.defaultProps = {
    title: "",
    data: []
};