// atoms/systemStateAtom.js
// 선택된 시스템 ID를 저장하고 사이드바의 토글상태를 저장하는 atom
import { atom } from 'recoil';
import localStorageEffect from '@recoil/effects/localStorageEffect';


export const selectedSystemIdState = atom({
    key: 'selectedSystemIdState',
    default: -999,
    effects_UNSTABLE: [localStorageEffect('selectedSystemIdState')],
    });

export const sidebarVisibilityState = atom({
    key: 'sidebarVisibilityState',
    default: true,
    effects_UNSTABLE: [localStorageEffect('sidebarVisibilityState')],
});
