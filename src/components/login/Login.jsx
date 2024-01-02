import React, { useState } from "react";
import logo from "/assets/images/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ApiService from "@components/axios/ApiService";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 27rem;
  border: 2px solid #7b91a7;
  border-radius: 10px;
  margin-top: 4rem;
  img {
    width: auto;
    height: 80px;
    margin-top: 90px;
    margin-bottom: 30px;
  }

  form {
    border-radius: 10px;
  }

  input {
    border: 2px solid #7b91a7;
    border-radius: 5px;
    padding: 10px 7px;
    margin-bottom: 30px;
    display: block;
    width: 93%;
  }

  button {
    border: 2px solid #003a75;
    border-radius: 5px;
    height: 39px;
    width: 100%;
    margin: 70px 0;
    color: white;
    background-color: #003a75;
    cursor: pointer;
  }

  p {
    color: #7b91a7;
    font-size: small;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const response = await ApiService.loginUser(username, password);
      if(response) {
        localStorage.setItem("userInfo", JSON.stringify(response.user));
        
        const userRole = response.user.role;
        if (userRole === "ADMIN") {
          navigate("/admin");
        } else if (userRole === "USER") {
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

  return (
    <Container>
      <LoginBox>
        <div>
          <img src={logo} alt="logo.png" />
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button type="submit">로그인</button>
          </form>
          <p>© 2023. (주)제이솔루션 all rights reserved.</p>
        </div>
      </LoginBox>
    </Container>
  );
}
