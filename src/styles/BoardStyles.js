// BoardStyles.js
// 게시판 관련 스타일
import styled from "styled-components";

// ~ContentContainer 에서 사용하는 스타일
// article : 파일 업로드 게시판(/system, /admin)
// manage : 시스템 관리 페이지(/manage)
// notice : 공지사항(/notice)
export const Boarddiv = styled.div`
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
    td {
        width:auto;
        padding: 7px 5px;
    }
    td:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    &.article { // 파일 업로드 게시판(/system, /admin)
        th:first-child { // 증빙자료명
            width: 22%;
        }
        th:nth-child(2){ // 업로드 일시
            width:20%;
        }
        th:nth-child(3) { // 검토결과
            width: 8%;
        }
        th:nth-child(4) { // 상세내역
            width: 20%;
        }
        th:nth-child(5) { // 관련파일
            width: 22%;
        }
        button { // 검토버튼
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
    &.manage { // 시스템 관리 페이지(/manage)
        th:first-child { // 시스템명
            width: 60%;
        }
        th:nth-child(2){
            width: 20%;
        }
        button { // 삭제버튼
            padding: 2px 5px;
            color: white;
            background-color: #CCCCCC;
            border: 1px solid #CCCCCC;
            border-radius: 10px;
            font-size: medium;
            cursor: pointer;
            text-align: center;
            &:hover {
                background-color: #007fff;
                transition: all 0.1s ease-in-out;
            }
        }
        
    }
    &.qna {
        th:first-child {
            width: 60%;
        }
        th:nth-child(2){
            width: 20%;
        }
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
    &.notice { // 공지사항(/notice)
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
    }
    
`;

export const StyledLink = styled.a`
    color: black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Tbodytr = styled.tr`
    border-bottom: 2px solid #e5eaf2;
    align-items: center;
    &:hover {
        background-color: #f3f6f9;
    }
`;

export const StatusDiv = styled.div` // 검토결과
    color: ${props => props.color};
`;

// 드롭다운 메뉴
export const Dropmenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 20;
    top: 2.45rem;
    right: 0.3rem;
    width: 5rem;
    border: 1px solid #E5EAF2;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  /* 그림자 효과 추가 */
    background-color: white;
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        padding-right: 20px;
        margin: 0;
        padding: 0;
    }
    li {
        cursor: pointer;
        padding: 0.3rem 1.3rem;
        border-bottom: 1px solid #E5EAF2; /* 항목 사이에 구분선을 추가 */
        &:hover {
            background-color: #e0e0e0;  // 호버 시 배경색 변경
            color: #4DBDE5;  // 호버 시 글자색 변경
            font-weight: bold; // 호버 시 폰트 굵기 변경
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);  // 호버 시 그림자 효과 추가
        }
        &:last-child {
            border-bottom: none; /* 마지막 항목에는 구분선을 제거 */
        }
    }
    &.active {
        color: #4DBDE5;
    }
`