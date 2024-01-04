// atoms/systemStateAtom.js
import { atom } from 'recoil';

export const selectedSystemIdState = atom({
    key: 'selectedSystemIdState',
    default: null,
    });

export const sidebarVisibilityState = atom({
    key: 'sidebarVisibilityState',
    default: true,
});
