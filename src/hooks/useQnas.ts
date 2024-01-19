// useQnas.ts
// Qna 데이터를 불러오는 커스텀 훅

import { useState, useEffect, useCallback } from "react";
import ApiService from "@components/axios/ApiService";

export const useQnas = (currentPage: number) => {
  const [qnas, setQnas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터를 불러오는 함수
  const fetchQnas = useCallback(() => {
    setLoading(true);
    ApiService.fetchQnas(currentPage)
      .then((articleData) => {
        setQnas(articleData.content);
        setTotalPages(articleData.totalPages);
        setError(null);
      })
      .catch((err) => {
        console.error("Qnas 요청 오류:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  // 컴포넌트 마운트시 및 currentPage가 변경될 때마다 fetchNotices 실행
  useEffect(() => {
    fetchQnas();
  }, [fetchQnas]);

  // refetchNotices 함수 반환
  return { qnas, totalPages, loading, error, refetchQnas: fetchQnas };
};
