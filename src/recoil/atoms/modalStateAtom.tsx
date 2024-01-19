// modalStateAtom.tsx
// 어느 모달창이 열려있는지 확인해주는 atom

import { atom } from 'recoil';

export const modalStateAtom = atom({
    key: 'modalState',
    default: false,
});

