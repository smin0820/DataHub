// Systems.ts
// Systems에 대한 타입을 정의합니다.

// System에 대한 타입을 정의합니다.
export interface SystemInfo {
    systemId: number;
    systemName: string;
}

// useSystem Hook에서 사용하는 타입을 정의합니다.
export interface UseSystemReturn {
    systemList: SystemInfo[];
    loading: boolean;
    error: Error | null;
    refetchSystem: () => void;
}