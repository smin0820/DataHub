import { useState, useEffect, useCallback } from "react";
import ApiService from "@components/axios/ApiService";
import { SystemInfo } from "@@types/Systems";

// 시스템 리스트를 불러오는 커스텀 훅
export const useSystems = () => {
  const [systemList, setSystemList] = useState<SystemInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // 데이터를 불러오는 함수
  const fetchSystem = useCallback(() => {
    setLoading(true);
    ApiService.fetchSystemNames()
      .then((articleData) => {
        if (articleData) {
          setSystemList(articleData.data.systems);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("시스템 리스트 요청 오류:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 컴포넌트 마운트시 및 currentPage가 변경될 때마다 fetchNotices 실행
  useEffect(() => {
    fetchSystem();
  }, [fetchSystem]);

  // refetchNotices 함수 반환
  return { systemList, loading, error, refetchSystem: fetchSystem };
};
