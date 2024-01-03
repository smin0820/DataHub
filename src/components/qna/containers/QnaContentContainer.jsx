// NoticeContentContainer.jsx
// 공지사항 목록의 내용물을 표기하기 위한 컨테이너 컴포넌트

import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import Data from "../../../Data.json";
import QnaDropdown from "@components/qna/containers/QnaDropdown";
import { useNavigate } from "react-router-dom";

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
        width: 55%;
    }
    th:nth-child(2){
        width: 20%;
    }
    td {
        width:auto;
        padding: 7px 5px;
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

export default function QnaContentContainer(props) {
    const navigate = useNavigate();
    const { title, data = [] } = props;
    const [currentOpenDropdown, setCurrentOpenDropdown] = useState(null);
    const [openModalArticleId, setopenModalArticleId] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isAdmin = userInfo && userInfo.role === "ADMIN";
    const [view, setView] = useState(false);

    const cutFileName = (name, maxLength = 20) => {
        if(name.length > maxLength) {
        return `${name.substring(0, maxLength)}...`;
        }
        return name;
    };

    // 드롭다운 토글 함수
    const toggleDropdown = (id) => {
        if (currentOpenDropdown === id) {
            // 이미 열린 드롭다운을 닫습니다.
            setCurrentOpenDropdown(null);
        } else {
            // 새로운 드롭다운을 엽니다.
            setCurrentOpenDropdown(id);
        }
    };

    return (
        <Boarddiv>
        <table>
            <caption>{title}</caption>
            <thead>
            <tr>
                <th>제목</th>
                <th>작성 시간</th>
                <th>글쓴이</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {data.map((n, i) => (
                <Tbodytr key={i}>
                
                <td onClick={()=> {
                //Q&A 아이디로 수정해야함
                navigate(`/qna/${n.articleId}`);
                }}>
                    <StyledLink href={n.taskFileUrl} target="_blank" rel="noopener noreferrer">
                    {cutFileName(n.taskFileName)}
                    </StyledLink>
                </td>
                <td>{n.uploadDate}</td>
                <td>admin님</td>
                <td>
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => toggleDropdown(n.articleId)}>
                            편집 {currentOpenDropdown === n.articleId ? "∧" : "∨"}
                        </span>
                        {currentOpenDropdown === n.articleId && <QnaDropdown />}
                    </div>
                </td>
                </Tbodytr>
            ))}
            </tbody>
        </table>
        </Boarddiv>
    );
}


QnaContentContainer.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
};

QnaContentContainer.defaultProps = {
    title: "",
    data: []
};