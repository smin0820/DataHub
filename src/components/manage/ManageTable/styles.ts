import styled from 'styled-components';
import * as S from '@styles/BoardStyles';

export const Boarddiv = styled(S.Boarddiv)`
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
`

export const Tbodytr = styled(S.Tbodytr)``