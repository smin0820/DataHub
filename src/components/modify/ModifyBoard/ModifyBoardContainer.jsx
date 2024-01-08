import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModifyBoardPresenter from '@components/modify/ModifyBoard/ModifyBoardPresenter';


const ModifyBoardContainer = () => {

    const userInfo = useRecoilValue(userState);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [systemName, setSystemName] = useState("");
    const [departmentName, setDepartmentName] = useState(userInfo.departmentName || "");
    const [department, setDepartment] = useState(userInfo.department || "");
    const [companyName, setCompanyName] = useState(userInfo.companyName || "");
    const [developerName, setDeveloperName] = useState(userInfo.developerName || "");
    const [contactNum, setContactNum] = useState(userInfo.contactNum || "");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [loginId] = useState(userInfo.loginId || "");
    let currentSystemId = userInfo?.systemIds?.[0];
    
    useEffect(() => {
      // admin 계정이면 시스템명을 가져오지 않음
      if (userInfo?.role === 'USER') {
        ApiService.fetchBaseCategory(currentSystemId)
          .then(data => {
            if (data && data.systemName) {
              setSystemName(data.systemName);
            }
          })
          .catch(error => {
            console.error('Error fetching system name:', error);
          });
      } else {
        setSystemName("");
      }
    }, []);

    const validateForm = () => {
      // admin은 비밀번호만 변경 가능
      if (userInfo.role === "USER") {
        if( !systemName || !departmentName || !department || !developerName || !contactNum || !password || !passwordCheck) {
          alert("모든 항목을 입력해주세요.");
          return false;
        }
      }

      if(password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }


      return true;
    };

    const handleUpdateClick = () => {
      if(!validateForm()) {
        return;
      }

      setModalOpen(true);
    };
    
    const handleInputChange = (setter) => (e) => {
      setter(e.target.value);
    };

  return (
      <ModifyBoardPresenter
        {...{ userInfo, systemName, departmentName, department, companyName, developerName, contactNum, loginId, password, passwordCheck,
    setSystemName, setDepartmentName, setDepartment, setCompanyName, setDeveloperName, setContactNum, setPassword, setPasswordCheck, 
    setModalOpen, isModalOpen, handleInputChange, handleUpdateClick, navigate }}
      />
    );
};

export default ModifyBoardContainer;
