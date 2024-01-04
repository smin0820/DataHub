import { atom } from 'recoil';
import localStorageEffect from '@recoil/effects/localStorageEffect';

const initialUserData  = {
    companyName: "Loading...",
    contactNum: "Loading...",
    department: "Loading...",
    departmentName: "Loading...",
    developerName: "Loading...",
    loginId: "Loading...",
    role: "LOADING",
    systemIds: [0]
};

export const userState = atom({
    key: 'userState',
    default: initialUserData, // 초기 상태는 로그인하지 않은 상태를 나타냄
    effects_UNSTABLE: [localStorageEffect('userState')],
});
