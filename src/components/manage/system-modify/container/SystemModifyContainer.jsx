import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import SystemModifyPresenter from './SystemModifyPresenter';



const SystemModifyContainer = () => {
    // const userInfo;
    // const userInfo = useRecoilValue(userState);
    let [userInfo, setUseInfo] = useState("");
    
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const systemInfo = {...location.state}; // 선택된 시스템 아이디
    
    const [systemName, setSystemName] = useState("");
    const [departmentName, setDepartmentName] = useState(userInfo.departmentName || "");
    const [department, setDepartment] = useState(userInfo.department || "");
    const [companyName, setCompanyName] = useState(userInfo.companyName || "");
    const [developerName, setDeveloperName] = useState(userInfo.developerName || "");
    const [contactNum, setContactNum] = useState(userInfo.contactNum || "");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [loginId, setLoginId] = useState(userInfo.loginId || "");
    let currentSystemId = userInfo?.systemIds?.[0];
    const [systemNameCheck, setSystemNameCheck] = useState(true);

    
    useEffect(() => {
      ApiService.systemModify(systemInfo.selectedsystemId)
        .then(data => {
          setUseInfo(data.user);
          setSystemName(data.systemName);
          setDepartment(data.user.department);
          setDepartmentName(data.user.departmentName);
          setDeveloperName(data.user.developerName);
          setCompanyName(data.user.companyName);
          setContactNum(data.user.contactNum);
          setLoginId(data.user.loginId);
        })
        .catch(error => {
          console.error(error)
        })
    }, [])
    
    // useEffect(() => {
    //   // admin 계정이면 시스템명을 가져오지 않음
    //   if (userInfo?.role === 'USER') {
    //     ApiService.fetchBaseCategory(currentSystemId)
    //       .then(data => {
    //         if (data && data.systemName) {
    //           setSystemName(data.systemName);
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error fetching system name:', error);
    //       });
    //   } else {
    //     setSystemName("");
    //   }
    // }, []);

    const validateForm = () => {
      // admin은 비밀번호만 변경 가능
      if (userInfo.role === "USER") {
        if( !systemName || !departmentName || !department || !developerName || !contactNum || !password || !passwordCheck) {
          alert("모든 항목을 입력해주세요.");
          return false;
        }
      }

      if ( systemNameCheck === false ) {
        alert("시스템명 중복확인을 해주세요.");
        return false;
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

    // 시스템명 변경확인
    const handleSystemNameChange = (e) => {
        const newSystemName = e.target.value;
        setSystemName(newSystemName);

        // Set systemNameCheck to false if the new input is different from the current system name
        if (newSystemName !== userInfo.systemName) {
            setSystemNameCheck(false);
        } else {
            setSystemNameCheck(true);
        }
    };

    // 시스템명 중복확인
    const checkSystemName = async () => {
      if (systemName === "") {
        alert("시스템명을 입력해주세요.");
        return;
      }
      console.log("시스템명 중복확인:", userInfo.loginId, systemName)
        try {
            const response = await ApiService.userCheckSystemName(userInfo.loginId, systemName);
            console.log("시스템명 중복확인 성공:", response);
            setSystemNameCheck(response);
            if(response) {
                alert("사용 가능한 시스템명입니다.");
            } else {
                alert("이미 존재하는 시스템명입니다.");
            }
        } catch (error) {
            console.error("시스템명 중복확인 실패:", error);
            setSystemNameCheck(false);
        }
    };

  return (
      <SystemModifyPresenter
        {...{ userInfo, systemName, departmentName, department, companyName, developerName, contactNum, loginId, password, passwordCheck,
    setSystemName, setDepartmentName, setDepartment, setCompanyName, setDeveloperName, setContactNum, setPassword, setPasswordCheck, 
    setModalOpen, isModalOpen, handleInputChange, handleUpdateClick, navigate, systemNameCheck, handleSystemNameChange, checkSystemName, systemInfo }}
      />
    );
};

export default SystemModifyContainer;