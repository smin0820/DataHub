// SystemContentContainer.jsx
// 시스템 파일 업로드의 내용을 표시해주는 컴포넌트입니다.
// {  }TableContiainer.jsx에서 내용을 전달해주면 표시해줍니다.

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CheckUploadModalContainer from "@components/common/modals/CheckUploadModal/CheckUploadModalContainer";
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
    width: 22%;
  }
  th:nth-child(2){
    width:20%;
  }
  th:nth-child(3) {
    width: 8%;
  }
  th:nth-child(4) {
    width: 20%;
  }
  th:nth-child(5) {
    width: 22%;
  }
  td {
    width:auto;
    padding: 7px 5px;
  }
  td:nth-child(3) {
    /* color: ${(props) => (props.approval ? "반려" : "#FF0000")};
    color: ${(props) => (props.approval ? "대기" : "#E8840F")}; */
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
`;

const StyledLink = styled.a`
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
`;

const Tbodytr = styled.tr`
  border-bottom: 2px solid #e5eaf2;
  align-items: center;
`;

export default function SystemContentContainer(props) {
  const { title, data = [] } = props;
  const { isOpen, selectedId, openModal, closeModal } = useIdModal(); // useIdModal 훅 사용
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo && userInfo.role === "ADMIN";

  const cutFileName = (name, maxLength = 20) => {
    if(name.length > maxLength) {
      return `${name.substring(0, maxLength)}...`;
    }
    return name;
  };

  return (
    <Boarddiv>
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>증빙자료명</th>
            <th>업로드 일시</th>
            <th>검토결과</th>
            <th>상세내역</th>
            <th>관련파일</th>
             {/* <th>차수</th>  */}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((n, i) => (
            <Tbodytr key={i}>
              
              <td>
                <StyledLink href={n.taskFileUrl} target="_blank" rel="noopener noreferrer">
                  {cutFileName(n.taskFileName)}
                </StyledLink>
              </td>
              <td>{n.uploadDate}</td>
              <td>
                {n.approval === "승인" ? (
                  <Approval></Approval>
                ) : n.approval === "대기" ? (
                  <Wait></Wait>
                ) : (
                  <Return></Return>
                )}
              </td>
              <td>{n.declineDetail}</td>
              <td>
                <StyledLink href={n.declineFileUrl} target="_blank" rel="noopener noreferrer">
                  {cutFileName(n.declineFileName)}
                </StyledLink>
              </td>
              {/* <td>{n.articleId}</td> */}
              <td>
                {isAdmin && (
                <button onClick={() => openModal(n.articleId)}>검토</button>
                )}
                {isOpen && selectedId === n.articleId && (
                  console.log("selectedId", selectedId),
                  <CheckUploadModalContainer closeModal={closeModal} articleId={selectedId} />
                )}
              </td>
            </Tbodytr>
          ))}
        </tbody>
      </table>
    </Boarddiv>
  );
}

function Approval() {
  return <div style={{color:'#62C12A'}}>승인</div>;
}

function Wait() {
  return <div style={{color:'#E8840F'}}>대기</div>;
}

function Return() {
  return <div style={{color:'#FF0000'}}>반려</div>;
}

SystemContentContainer.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object)
};

SystemContentContainer.defaultProps = {
  title: "",
  data: []
};