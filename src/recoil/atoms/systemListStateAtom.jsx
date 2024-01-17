// systemListState.jsx
// 새로운 시스템 등록 후 시스템관리 페이지의 시스템 목록을 다시 불러오기 위한 recoil atom입니다.

import { atom } from 'recoil';

export const systemListState = atom({
    key: 'systemListState', // 고유한 키
    default: [], // 기본값은 빈 배열
});
