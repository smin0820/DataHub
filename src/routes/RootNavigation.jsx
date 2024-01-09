import { Route, Routes, Navigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import LoginNavigation from "./LoginNavigation";
import { useToken } from "@hooks/useToken";
import AdminPage from "@components/admin/AdminPage";
import System from "@components/system/System";
import ModifyPage from "@components/modify/ModifyPage";
import Regist from "@components/regist/Regist";
import Notice from "@components/notice/Notice";
import Qna from "@components/qna/Qna";
import QnaDetail from "@components/qna-detail/QnaDetail";
import useIsLoggedIn from "@hooks/useIsLoggedIn";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@components/common/NotFoundPage";
import ManagePage from "@components/manage/ManagePage";

const RootNavigation = () => {
  const { getToken } = useToken();
  const isLoggedIn = useIsLoggedIn();

  const getRedirectPath = () => {
    if (isLoggedIn.role === "ADMIN") {
      return "/admin";
    } else if (isLoggedIn.role === "USER") {
      return "/system";
    } else {
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootNavigation;
