// UserInfo.ts
// UserInfo에 대한 타입을 정의합니다.

// 로그인시 받아오는 UserInfo에 대한 타입을 정의합니다.
export interface UserInfo {
    loginId: string; // 로그인 ID
    companyName: string; // 업체명
    developerName: string; // 담당자
    contactNum: string; // 담당자 연락처
    department: string; // 시스템 담당부서
    departmentName: string; // 시스템 담당자
    role: string; // 권한
    systemIds: number[]; // 시스템 ID 목록
}

// 회원가입시 받아오는 UserInfo에 대한 타입을 정의합니다.
export interface RegistUserInfo {
    systemName: string; // 시스템명
    departmentName: string; // 시스템 담당자
    department: string; // 시스템 담당부서
    companyName: string; // 업체명
    developerName: string; // 담당자
    contactNum: string; // 담당자 연락처
    loginId: string; // 로그인 ID
    //password: string; // 비밀번호
    //passwordCheck: string; // 비밀번호 확인
}
