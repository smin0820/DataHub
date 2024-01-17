// global.d.ts
// 정적 파일을 임포트 할 때, 타입을 지정해줍니다.

// img 파일을 import 할 때, 타입을 지정해줍니다.
declare module '*.png' {
    const value: string;
    export = value;
    }
