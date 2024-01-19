import styled from 'styled-components';
import * as S from '@styles/BoardStyles';

export const Boarddiv = styled(S.Boarddiv)`
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
    button.delete {
        // 삭제 버튼
        background-color: #cccccc;
        border: 1px solid #cccccc;
    }
`;

export const StyledLink = styled(S.StyledLink)``

export const Tbodytr = styled(S.Tbodytr)``

export const StatusDiv = styled(S.StatusDiv)``