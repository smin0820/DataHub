// noticesAtom.tsx
// 공지사항 업로드 후 공지사항 목록을 다시 불러오기 위한 recoil atom입니다.

import { atom } from 'recoil';

export const noticesState = atom({
    key: 'noticesState', // 고유한 키
    default: [], // 기본값은 빈 배열
});
