import styled from 'styled-components';
import * as S from '@styles/BoardStyles';

export const Boarddiv = styled(S.Boarddiv)`
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
`

export const Tbodytr = styled(S.Tbodytr)``