import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
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
            width: 60%;
        }
        th:nth-child(2){
            width: 20%;
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
    }
`

const Tbodytr = styled.tr`
    border-bottom: 2px solid #e5eaf2;
    align-items: center;
    &:hover {
        background-color: #f3f6f9;
    }
`;

export default function ManageContentContainer(props) {
    const {title} = props;
    const data = ['지하수 시스템', '지도 시스템'];
    return (
        <Container>
            <table>
                <caption>{title}</caption>
                <thead>
                    <tr>
                        <th>시스템명</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <Tbodytr>
                        <td>{data[0]}</td>
                        <td><button>삭제</button></td>
                    </Tbodytr>
                </tbody>
            </table>
        </Container>
    );
}
