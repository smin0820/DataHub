// AdminWaitTable.tsx
// 대기중 게시물 테이블 컴포너트
// 상위 컴포넌트 > AdminTablePresenter.tsx

import React from "react";
import CheckUploadModalContainer from "@components/common/modals/CheckUploadModal/CheckUploadModalContainer";
import FileDeleteModalContainer from "@components/common/modals/FileDeleteModal/FileDeleteModalContainer";
import useIdModal from "@hooks/useIdModal";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import * as S from './styles';

import { AdminTable } from "@@types/Articles";

interface AdminWaitTableProps {
  title: string;
  data: AdminTable[];
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

const AdminWaitTable: React.FC<AdminWaitTableProps> = (props) => {
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
    <S.Boarddiv className="article">
        <table>
            <caption>{title}</caption>
            <thead>
                <tr>
                    <th>시스템명</th>
                    <th>카테고리명</th>
                    <th>증빙자료명</th>
                    <th>업로드 일시</th>
                    <th>검토결과</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((n, i) => (
                    <S.Tbodytr key={i}>
                      {/* 시스템명 */}
                      <td>{n.systemName}</td>

                      {/* 카테고리명 */}
                      <td>{n.detailCategoryName}</td>

                      {/* 증빙자료명 */}
                      <td>
                        <S.StyledLink
                          href={n.taskFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {cutFileName(n.taskFileName)}
                        </S.StyledLink>
                      </td>

                      {/* 업로드 일시 */}
                      <td>{n.uploadDate}</td>
                      
                      {/* 검토결과 */}
                      <td>
                        <S.StatusDiv color={getStatusColor(n.approval)}>
                          {getStatusText(n.approval)}
                        </S.StatusDiv>
                      </td>
                      {/* 검토결과별 삭제, 검토 버튼 활성화 */}
                      <td>
                        {n.approval === "대기" && (
                          <button
                            className="delete"
                            onClick={() => openDeleteModal(n.articleId)}
                          >
                            삭제
                          </button>
                        )}
                        {isDeleteModalOpen &&
                          seletedIdDeleteModal === n.articleId && (
                            <FileDeleteModalContainer
                              closeModal={closeDeleteModal}
                              articleId={seletedIdDeleteModal}
                            />
                          )}
                        {isAdmin && (
                          <button
                            onClick={() => openCheckModal(n.articleId)}
                          >
                            검토
                          </button>
                        )}
                        {isCheckModalOpen &&
                          seletedIdCheckModal === n.articleId && (
                            <CheckUploadModalContainer
                              closeModal={closeCheckModal}
                              articleId={seletedIdCheckModal}
                            />
                          )}
                      </td>
                    </S.Tbodytr>
                ))}
            </tbody>
        </table>
    </S.Boarddiv>
  );
}

export default AdminWaitTable;