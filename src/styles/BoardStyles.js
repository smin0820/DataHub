// BoardStyles.js
// 게시판 관련 스타일
import styled from "styled-components";

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

    &.article { // 파일 업로드 게시판(/system, /admin)
        th {
            width: auto;
            text-align: left;
            padding: 7px 5px;
            font-weight: normal;
        }
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
        td {
            width:auto;
            padding: 7px 5px;
        }
        td:last-child {
            display: flex;
            justify-content: flex-end;
            align-items: center;
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
`;

export const StatusDiv = styled.div` // 검토결과
    color: ${props => props.color};
`;