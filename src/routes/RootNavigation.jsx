import { Route, Routes } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import LoginNavigation from "./LoginNavigation";
import { useToken } from "@hooks/useToken";
import Admin from "@components/admin/Admin";
import System from "@components/system/System";
import Modify from "@components/modify/Modify";
import Regist from "@components/regist/Regist";
import { Navigate } from "react-router-dom";

const RootNavigation = () => {
  const { getToken } = useToken();
  const isLoggedIn = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo && JSON.parse(userInfo);
  }

  return (
    <Routes>
      {/* <Route
        path="*"
        element={getToken("access") ? <MainNavigation /> : <LoginNavigation />}
      />
      <Route path="/" element={<MainNavigation></MainNavigation>}/> */}
      <Route path="/" element={isLoggedIn() ? <MainNavigation /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginNavigation></LoginNavigation>}/>
      <Route path="/admin" element={<Admin></Admin>}/>
      <Route path="/system" element={<System></System>}/>
      <Route path="/modify" element={<Modify></Modify>}/>
      <Route path="/regist" element={<Regist></Regist>}/>
    </Routes>
  );
};

export default RootNavigation;
