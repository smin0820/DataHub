// ModifyBoardContainer.tsx
// 시스템 정보 수정 페이지를 위한 컨테이너 컴포넌트

import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '@components/axios/ApiService';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms/userStateAtom';
import ModifyBoardPresenter from '@components/modify/ModifyBoard/ModifyBoardPresenter';
import { UserInfo, ModifyUserInfo } from '@@types/UserInfo';

const ModifyBoardContainer: React.FC = () => {
    const userInfo = useRecoilValue<UserInfo>(userState);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    // 기존정보와 수정된 정보를 담을 state
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
    let currentSystemName = "";
    const [systemNameCheck, setSystemNameCheck] = useState(true);
    
    useEffect(() => {
      // admin 계정이면 시스템명을 가져오지 않음
      if (userInfo?.role === 'USER') {
        ApiService.fetchBaseCategory(currentSystemId)
          .then(data => {
            if (data && data.systemName) {
              setSystemName(data.systemName);
              currentSystemName = data.systemName;
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
    
    const handleInputChange = (setter: any) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

    // 시스템명 변경확인
    const handleSystemNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newSystemName = e.target.value;
        setSystemName(newSystemName);

        // Set systemNameCheck to false if the new input is different from the current system name
        if (newSystemName !== currentSystemName) {
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
      <ModifyBoardPresenter
        {...{ userInfo, currentSystemName,
          systemName, systemNameCheck, handleSystemNameChange, checkSystemName, 
          departmentName, setDepartmentName, 
          department, setDepartment,
          companyName, setCompanyName,
          developerName, setDeveloperName,
          contactNum, setContactNum,
          loginId, 
          password, setPassword,
          passwordCheck, setPasswordCheck,
          isModalOpen, setModalOpen, 
          handleInputChange,
          handleUpdateClick,
          navigate,
        }}
      />
    );
};

export default ModifyBoardContainer;
