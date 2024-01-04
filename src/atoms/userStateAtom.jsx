import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: null, // 초기 상태는 로그인하지 않은 상태를 나타냄
});
