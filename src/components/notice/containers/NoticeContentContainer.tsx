// NoticeContentContainer.tsx
// 공지사항 목록의 내용물을 표기하기 위한 컨테이너 컴포넌트

import React from "react";
import NoticeDropdown from "@components/notice/containers/NoticeDropdown";
import useDropdown from "@hooks/useDropdown";
import NoticeViewModalContainer from "@components/notice/modals/NoticeViewModal/NoticeViewModalContainer";
import useIdModal from "@hooks/useIdModal";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import * as S from "@components/notice/containers/styles";

interface NoticeContentContainerProps {
    title: string;
    data: any[];
    onRefresh: () => void;
}

const NoticeContentContainer: React.FC<NoticeContentContainerProps> = (props) => {
    const { title, data = [], onRefresh } = props;
    const userInfo = useRecoilValue(userState);
    const isAdmin = userInfo && userInfo.role === "ADMIN";
    const { currentOpenDropdown, toggleDropdown, dropdownRefs } = useDropdown();
    const { isOpen: isViewOpen, selectedId, openModal: openViewModal, closeModal: closeViewModal } = useIdModal();

    return (
        <S.Boarddiv className="notice">
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
                    <S.Tbodytr key={i} onClick={() => openViewModal(n.noticeId)}>
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
                    </S.Tbodytr>   
                ))}
                </tbody>
            </table>
            {isViewOpen && selectedId && <NoticeViewModalContainer noticeId = {selectedId} closeModal={closeViewModal} />}
        </S.Boarddiv>
    );
}

export default NoticeContentContainer;