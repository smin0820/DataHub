// qnasAtom.jsx
// QnA 업로드 후 Qna 목록을 다시 불러오기 위한 recoil atom입니다.


import { atom } from 'recoil';

export const qnasState = atom({
    key: 'qnasState', // 고유한 키
    default: [], // 기본값은 빈 배열
});
