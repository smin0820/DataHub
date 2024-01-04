import { atom } from 'recoil';

const initialUserData  = {
    companyName: "Loading...",
    contactNum: "Loading...",
    department: "Loading...",
    departmentName: "Loading...",
    developerName: "Loading...",
    loginId: "Loading...",
    role: "USER",
    systemIds: [0]
};

export const userState = atom({
    key: 'userState',
    default: initialUserData, // 초기 상태는 로그인하지 않은 상태를 나타냄
});
