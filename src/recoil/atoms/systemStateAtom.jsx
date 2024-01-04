// atoms/systemStateAtom.js
import { atom } from 'recoil';
import localStorageEffect from '@recoil/effects/localStorageEffect';


export const selectedSystemIdState = atom({
    key: 'selectedSystemIdState',
    default: null,
    effects_UNSTABLE: [localStorageEffect('selectedSystemIdState')],
    });

export const sidebarVisibilityState = atom({
    key: 'sidebarVisibilityState',
    default: true,
    effects_UNSTABLE: [localStorageEffect('sidebarVisibilityState')],
});
