import { atom } from 'recoil';

export const qnasState = atom({
    key: 'qnasState', // 고유한 키
    default: [], // 기본값은 빈 배열
});
