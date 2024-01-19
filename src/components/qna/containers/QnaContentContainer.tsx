// QnaContentContainer.tsx
// Q&A 목록의 내용물을 표기하기 위한 컨테이너 컴포넌트

import React from "react";
import useDropdown from "@hooks/useDropdown";
import { useNavigate } from "react-router-dom";
import QnaDropdown from "./QnaDropdown.jsx";
import * as S from "@components/qna/containers/styles";

interface QnaContentContainerProps {
    title: string;
    data?: any[];
    onRefresh: () => void;
}

const QnaContentContainer: React.FC<QnaContentContainerProps> = (props) => {
    const { title, data = [], onRefresh } = props;
    const navigate = useNavigate();
    const { currentOpenDropdown, toggleDropdown, dropdownRefs  } = useDropdown();
    
    return (
        <S.Boarddiv>
            <table>
                <caption>{title}</caption>
                <thead>
                <tr>
                    <th>제목</th>
                    <th>작성 날짜</th>
                    <th>글쓴이</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map((n, i) => (
                    <S.Tbodytr key={i}  onClick={() => {
                        navigate(`/qna/${n.qaId}`, {
                            state: {
                                selectedqaId: n.qaId,
                            }
                        });
                    }}>
                    <td>
                        {n.qaTitle}
                    </td>
                    <td>
                        {n.qaDate}
                    </td>
                    <td>{n.username}</td>
                    <td style={{ position: 'relative' }} ref={el => dropdownRefs.current.set(n.qaId, el)} onClick={(event) => event.stopPropagation()}>
                        {(
                            <>
                                <span onClick={() => toggleDropdown(n.qaId)}>
                                    편집 {currentOpenDropdown === n.qaId ? "∧" : "∨"}
                                </span>
                                {currentOpenDropdown === n.qaId && <QnaDropdown qaId={n.qaId} onRefresh={onRefresh} />}
                            </>
                        )}
                    </td>
                    </S.Tbodytr>   
                ))}
                </tbody>
            </table>
        </S.Boarddiv>
    );
}

export default QnaContentContainer;