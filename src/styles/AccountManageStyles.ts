// AccountManageStyles.js
// 계정 관리 페이지 ( /modify, /regist ) 스타일

import styled from "styled-components";

export const PageContainer = styled.div` // 페이지 전체 스타일
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-height: 1080px;
`;

export const Title = styled.h1` // 페이지 제목 스타일
    margin-top: 60px;
    margin-bottom: 60px;
    font-size: 50px;
`;

export const Container = styled.div` // 페이지 컨테이너 스타일
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    margin-top: 30px;
`;

export const SystemInfoBar = styled.div` // "시스템 정보" 바 스타일
    box-sizing: border-box;
    border: 1px solid #DAE0E7;
    border-radius: 5px;
    width: 100%;
    background-color: #F3F6F9;
    text-align: left;
    padding: 10px 20px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
`;

export const Icon = styled.img` // 아이콘 스타일
    height: 20px;
    width: 20px;
    margin-right: 10px;
`;

export const Form = styled.form` // 입력 칸을 정렬하는 폼 스타일
    display: grid;
    grid-gap: 0px;
    label {
        display: flex;
        justify-content: space-between;
    }
    input {
        padding: 10px;
        width: 100%;
    }
`;

export const FormRow = styled.div` // 입력 칸을 정렬하는 폼 (행) 스타일
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    min-height: 75px;
    & + & {
        margin-top: 50px;
    }
`;

export const FormContent = styled.div` // 입력 칸을 정렬하는 폼 (열) 스타일
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0px;
    min-height: 75px;
    span {
        font-size: 16px;
    }
`;

export const InputContainer = styled.label` // 입력 칸 스타일
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    max-width: 1200px;
    background-color: #ffffffa0;
    border: none;
    border-radius: 5px;
    width: 95%;
    box-sizing: border-box;
    position: relative;
    align-items: stretch;
    input {
        border: 1px solid #DAE0E7;
        border-radius: 5px;
        outline: none;
        font-size: 16px;
        width: 95%;
        &::placeholder {
            color: #DAE0E7;
        }
        &:disabled {
            background-color: #DAE0E7;
            &::placeholder {
                color: #7B91A7;
            }
        }
    }
    input:last-child {
        margin-right: 0;
    }
    p {
        position: relative;
        right: 0px;
        bottom: 0px;
        font-size: 12px;
        margin: 0;
        text-align: right;
    }
`;

export const InputContainerHeader = styled.div` // 입력 칸 헤더 스타일
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    margin-bottom: 0px;
`;

export const ButtonIconGroup = styled.div` // 중복확인 버튼과 아이콘을 정렬하는 div 스타일
    display: flex;
    align-items: center;
    button { // 중복확인 버튼
        padding:2px 2px;
        color: white;
        background-color: #007fff;
        border: 1px solid #007fff;
        border-radius: 8px;
        font-size: small;
        font-weight: normal;
        cursor: pointer;
        text-align: center;
        margin-top: 0px;
    }
    img { // 아이콘
        height: 15px;
        width: 15px;
        margin-right: 10px;
        margin-top: 0px;
        pointer-events: none;
    }
`;

export const ButtonGroup = styled.div` // "취소"와 "수정(등록)하기" 버튼을 정렬하는 div 스타일
    display: flex;
    justify-content: center;
    margin-top: 50px;
    padding: 10px 30px;

    .group-button {
        display: flex;
        width: 160px;
        padding: 16px 0px;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 10px;

        &:first-child {
        background-color: #C7D0DD;
        color: white;
        }

        &:last-child {
        background-color: #003a75;
        color: white;
        }
    }
`;

export const RequiredSpan = styled.span` // 필수 입력 항목을 표시하는 span 스타일
    &::after {
        content: " *";
        color: #007fff;
    }
`;
