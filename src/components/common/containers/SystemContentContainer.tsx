// SystemContentContainer.tsx
// 시스템 파일 업로드의 내용을 표시해주는 컴포넌트입니다.
// {  }TableContiainer.tsx에서 내용을 전달해주면 표시해줍니다.

import React from "react";
import CheckUploadModalContainer from "@components/common/modals/CheckUploadModal/CheckUploadModalContainer";
import FileDeleteModalContainer from "@components/common/modals/FileDeleteModal/FileDeleteModalContainer";
import useIdModal from "@hooks/useIdModal";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import { Boarddiv, Tbodytr, StyledLink, StatusDiv } from "@styles/BoardStyles";
import { Article } from "@@types/Articles";

interface SystemContentContainerProps {
  title: string;
  data: Article[];
}

function getStatusColor(status : string) {
  switch(status) {
    case '승인':
      return '#62C12A';
    case '반려':
      return '#FF0000';
    default:
      return '#E8840F';// 기본 색상(대기)
  }
}

function getStatusText(status : string) {
  switch(status) {
    case '승인':
      return '승인';
    case '반려':
      return '반려';
    default:
      return '대기'; // 기본 텍스트
  }
}

const SystemContentContainer: React.FC<SystemContentContainerProps> = (props) => {
  const { title, data = [] } = props;
  const { isOpen : isCheckModalOpen, selectedId : seletedIdCheckModal, openModal : openCheckModal, closeModal : closeCheckModal } = useIdModal(); // useIdModal 훅 사용
  const { isOpen : isDeleteModalOpen, selectedId : seletedIdDeleteModal, openModal : openDeleteModal, closeModal : closeDeleteModal } = useIdModal(); // useIdModal 훅 사용
  const userInfo = useRecoilValue(userState);
  const isAdmin = userInfo && userInfo.role === "ADMIN";

  // 파일 이름이 너무 길면 ...으로 표시해주는 함수
  const cutFileName = (name : string , maxLength : number = 20) => {
    if(name.length > maxLength) {
      return `${name.substring(0, maxLength)}...`;
    }
    return name;
  };

  return (
    <Boarddiv className="article">
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            {/* <th>차수</th>  */}
            <th>증빙자료명</th>
            <th>업로드 일시</th>
            <th>검토결과</th>
            <th>상세내역</th>
            <th>관련파일</th>
            <th></th>{/* 버튼 */}
          </tr>
        </thead>
        <tbody>
          {data.map((n, i) => (
            <Tbodytr key={i}>
              {/* 차수 <td>{n.articleId}</td> */}
              {/* 증빙자료명 */}
              <td>
                <StyledLink href={n.taskFileUrl} target="_blank" rel="noopener noreferrer">
                  {cutFileName(n.taskFileName)}
                </StyledLink>
              </td>
              {/* 업로드 일시 */}
              <td>{n.uploadDate}</td>
              {/* 검토결과 */}
              <td>
                <StatusDiv color={getStatusColor(n.approval)}>
                  {getStatusText(n.approval)}
                </StatusDiv>
              </td>
              {/* 상세내역 */}
              <td>{n.declineDetail}</td>
              {/* 관련파일 */}
              <td>
                <StyledLink href={n.declineFileUrl} target="_blank" rel="noopener noreferrer">
                  {cutFileName(n.declineFileName)}
                </StyledLink>
              </td>
              {/* 버튼 */}
              <td>
                {n.approval === '대기' && (
                  <button className="delete" onClick={() => openDeleteModal(n.articleId)}>삭제</button>
                )}
                {isDeleteModalOpen && seletedIdDeleteModal === n.articleId && (
                  <FileDeleteModalContainer closeModal={closeDeleteModal} articleId={seletedIdDeleteModal} />
                )}
                {isAdmin && (
                <button className="check" onClick={() => openCheckModal(n.articleId)}>검토</button>
                )}
                {isCheckModalOpen && seletedIdCheckModal === n.articleId && (
                  <CheckUploadModalContainer closeModal={closeCheckModal} articleId={seletedIdCheckModal} />
                )}
              </td>
            </Tbodytr>
          ))}
        </tbody>
      </table>
    </Boarddiv>
  );
}

export default SystemContentContainer;