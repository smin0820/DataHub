import { useCallback } from "react";

const ACCESS_TOKEN_KEY = "@accessToken";
const REFRESH_TOKEN_KEY = "@refreshToken";

export function useToken() {
  const getTokenKey = (key) => {
    return key === "access" ? ACCESS_TOKEN_KEY : REFRESH_TOKEN_KEY;
  };

  const getToken = useCallback((key) => {
    return localStorage.getItem(getTokenKey(key)) ?? "";
  }, []);

  const setToken = useCallback((key, value) => {
    localStorage.setItem(getTokenKey(key), value);
  }, []);

  const removeToken = useCallback((key) => {
    localStorage.removeItem(getTokenKey(key));
  }, []);

  return {
    getToken,
    setToken,
    removeToken,
  };
}
