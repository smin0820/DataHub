import { atom } from 'recoil';

export const noticesState = atom({
    key: 'noticesState', // 고유한 키
    default: [], // 기본값은 빈 배열
});
