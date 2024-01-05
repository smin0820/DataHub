import { Route, Routes, Navigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import LoginNavigation from "./LoginNavigation";
import { useToken } from "@hooks/useToken";
import Admin from "@components/admin/Admin";
import System from "@components/system/System";
import Modify from "@components/modify/Modify";
import Regist from "@components/regist/Regist";
import Notice from "@components/notice/Notice";
import Qna from "@components/qna/Qna";
import QnaDetail from "@components/qna/QnaDetail";
import useIsLoggedIn from "@hooks/useIsLoggedIn";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@components/common/NotFoundPage";

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
        <ProtectedRoute element={<Admin />} allowedRoles={["ADMIN"]}/> 
      }/>
      <Route path="/system" element={
        <ProtectedRoute element={<System />}/> 
      }/>
      <Route path="/modify" element={
        <ProtectedRoute element={<Modify />}/>
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
      <Route path="/qna/:id" element={
        <ProtectedRoute element={<QnaDetail />}/>
      }/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootNavigation;
