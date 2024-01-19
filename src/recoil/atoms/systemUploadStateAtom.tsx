// systemUploadStateAtom.tsx
// 시스템에 파일(혹은 검토결과)을 업로드 후 시스템 상세 페이지를 다시 불러오기 위한 recoil atom입니다.

import { atom } from 'recoil';

export const systemUploadState = atom({
    key: 'systemUploadState',
    default: 0,
});
