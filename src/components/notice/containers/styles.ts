import styled from 'styled-components';
import * as S from '@styles/BoardStyles';

export const Boarddiv = styled(S.Boarddiv)`
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
`

export const Tbodytr = styled(S.Tbodytr)``

export const SearchFilter = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.2rem 0rem;
  div {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
  }
  select {
    border: 2px solid #e5eaf2;
    border-right: 1px;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    font-size: medium;
    cursor: pointer;
  }
  input {
    border: 2px solid #e5eaf2;
    padding: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: medium;
    width: 30%;
  }
`