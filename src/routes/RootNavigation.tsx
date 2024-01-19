import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginNavigation from "./LoginNavigation";
import { useToken } from "@hooks/useToken";
import AdminPage from "@components/admin/AdminPage";
import System from "@components/system/System";
import ModifyPage from "@components/modify/ModifyPage";
import Regist from "@components/manage/regist/Regist";
import Notice from "@components/notice/Notice";
import Qna from "@components/qna/Qna";
import QnaDetail from "@components/qna/qna-detail/QnaDetail";
import useIsLoggedIn from "@hooks/useIsLoggedIn";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@components/common/NotFoundPage";
import ManagePage from "@components/manage/ManagePage";
import { useEnhancedLogout } from "@components/login/Logout/AutoLogout";
import SystemModifyPage from "@components/manage/system-modify/SystemModifyPage";

const RootNavigation = () => {
  const { getToken } = useToken();
  const [isLoggedIn, userInfo] = useIsLoggedIn();
  useEnhancedLogout();
  
  const getRedirectPath = () => {
    if(userInfo) {
        if (userInfo.role === "ADMIN") {
        return "/admin";
      } else if (userInfo.role === "USER") {
        return "/system";
      } else {
        return "/login";
      }
    }
    else {
      return "/login";
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to={getRedirectPath()} /> : <LoginNavigation />}
      />
      <Route path="/login" element={<LoginNavigation />} />
      <Route path="/admin" element={
        <ProtectedRoute element={<AdminPage />} allowedRoles={["ADMIN"]}/> 
      }/>
      <Route path="/system" element={
        <ProtectedRoute element={<System />}/> 
      }/>
      <Route path="/modify" element={
        <ProtectedRoute element={<ModifyPage />}/>
      }/>
      <Route path="/regist" element={
        <ProtectedRoute element={<Regist />} allowedRoles={["ADMIN"]}/>
      }/>
      <Route path="/notice" element={
        <ProtectedRoute element={<Notice />}/>
      }/>
      <Route path="/qna" element={
        <ProtectedRoute element={<Qna />}/>
      }/>
      <Route path="/manage" element={
        <ProtectedRoute element={<ManagePage />}/>
      }/>
      <Route path="/qna/:id" element={
        <ProtectedRoute element={<QnaDetail />}/>
      }/>
      <Route path="/system-modify" element={
        <ProtectedRoute element={<SystemModifyPage />}/>
      }/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootNavigation;
