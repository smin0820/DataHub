// LoginContainer.tsx
// 로그인(/login) 컨테이너 컴포넌트입니다.

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "@components/axios/ApiService";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import LoginPresenter from "@components/login/LoginPresenter";
import { selectedSystemIdState } from "@recoil/atoms/systemStateAtom";
import { UserInfo } from "@@types/UserInfo";

export default function LoginContainer() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userState);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [ selectedSystemId, setSelectedSystemId] = useRecoilState<number>(selectedSystemIdState);
  
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try{
      const response = await ApiService.loginUser(username, password);
      if(response) {
        setUserInfo({ ...response.user });
        const userRole = response.user.role;
        if (userRole === "ADMIN") {
          navigate("/admin");
        } else if (userRole === "USER") {
          setSelectedSystemId(response.user.systemIds[0]);
          navigate("/system");
        } else {
          setError('알 수 없는 사용자 역할');
        }
      } else {
        setError("로그인 실패: 잘못된 사용자 이름 또는 비밀번호");
      }
      setTimeout(() => {
        setError("");
      }, 2000);
    } catch (error: any) {
      console.error('로그인 실패: ',error);
    }
  };

    useEffect(() => {
    if (userInfo && userInfo.role !== 'LOADING') {
      if (userInfo.role === 'ADMIN') {
        navigate('/admin');
      } else if (userInfo.role === 'USER') {

        navigate('/system');
      }
    }
  }, [userInfo, navigate]);


  return (
    <LoginPresenter
      username={username}
      password={password}
      error={error}
      onUsernameChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      onPasswordChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      onFormSubmit={handleLogin}
    />
  );
}