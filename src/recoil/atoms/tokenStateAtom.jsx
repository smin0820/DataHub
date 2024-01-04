import { atom } from 'recoil';
import localStorageEffect from '@recoil/effects/localStorageEffect';


export const tokenState = atom({
    key: 'tokenState',
    default: null, // 초기 상태는 로그인하지 않은 상태를 나타냄
    effects_UNSTABLE: [localStorageEffect('tokenState')],
});
