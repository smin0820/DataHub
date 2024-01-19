// userStateAtom.tsx
// 로그인 후 사용자 정보를 관리하기 위한 recoil atom입니다.

import { atom } from 'recoil';
import localStorageEffect from '@recoil/effects/localStorageEffect';
import { UserInfo } from '@@types/UserInfo';

const initialUserData: UserInfo  = {
    companyName: "Loading...",
    contactNum: "Loading...",
    department: "Loading...",
    departmentName: "Loading...",
    developerName: "Loading...",
    loginId: "Loading...",
    role: "LOADING",
    systemIds: [0]
};

export const userState = atom<UserInfo>({
    key: 'userState',
    default: initialUserData, // 초기 상태는 로그인하지 않은 상태를 나타냄
    effects_UNSTABLE: [localStorageEffect('userState')],
});
