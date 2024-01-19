import styled from 'styled-components';
import * as S from '@styles/BoardStyles';

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
    button.delete { // 삭제 버튼
        background-color: #CCCCCC;
        border: 1px solid #CCCCCC;
    }
`

export const StyledLink = styled(S.StyledLink)``

export const Tbodytr = styled(S.Tbodytr)``

export const StatusDiv = styled(S.StatusDiv)``