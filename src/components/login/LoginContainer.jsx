// LoginContainer.jsx
// 로그인(/login) 컨테이너 컴포넌트입니다.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "@components/axios/ApiService";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import LoginPresenter from "@components/login/LoginPresenter";
import { selectedSystemIdState } from "@recoil/atoms/systemStateAtom";
import { tokenState } from "@recoil/atoms/tokenStateAtom";

export default function LoginContainer() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ selectedSystemId, setSelectedSystemId] = useRecoilState(selectedSystemIdState);
  const [, setToken] = useRecoilState(tokenState);
  
  const handleLogin = async (event) => {
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
    } catch (error) {
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
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onFormSubmit={handleLogin}
    />
  );
}
