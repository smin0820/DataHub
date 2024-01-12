import { atom } from 'recoil';

export const systemListState = atom({
    key: 'systemListState', // 고유한 키
    default: [], // 기본값은 빈 배열
});
