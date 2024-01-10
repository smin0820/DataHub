import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RegistBoardPresenter from '@components/regist/RegistBoard/RegistBoardPresenter';
import ApiService from '@components/axios/ApiService';

const RegistBoardContainer = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputValues, setInputValues] = useState({
      systemName: '',
      departmentName: '',
      department:'',
      companyName:'',
      developerName:'',
      contactNum:'',
      loginId:'',
    });
    const [systemNameCheck, setSystemNameCheck] = useState(false);
    const [loginIdCheck, setLoginIdCheck] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      //input 값이 변경될 때 호출되는 함수
      const { name, value } = e.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [name] : value,
      }));

      if (name === "systemName") {
        setSystemNameCheck(false);
      }
      if (name === "loginId") {
        setLoginIdCheck(false);
      }
    };

    const handleSignUp = () => {
      //입력 값이 비어있는지 확인
      if (!inputValues.systemName || !inputValues.departmentName || !inputValues.department || !inputValues.developerName || !inputValues.contactNum || !inputValues.loginId)  {
        alert('모든 값을 입력해주세요.');
        return; // 등록을 못하게 만듦
      }

      if ( systemNameCheck === false ) {
        alert("시스템명 중복확인을 해주세요.");
        return false;
      }

      if ( loginIdCheck === false ) {
        alert("아이디 중복확인을 해주세요.");
        return false;
      }
      
      setModalOpen(true);
    };

    const handleLoginIdCheck = async (event) => {
      //아이디 중복 확인
      // true면 가능(중복없음)), false면 불가능
      event.stopPropagation();
      console.log("아이디 중복확인:", inputValues.loginId)
      if (inputValues.loginId === "") {
        alert("아이디를 입력해주세요.");
        return;
      }
      try {
          const response = await ApiService.adminCheckLoginId( inputValues.loginId );
          console.log("아이디 중복확인 성공:", response);
          setLoginIdCheck(response);
          if(response) {
              alert("사용 가능한 아이디입니다.");
          } else {
              alert("이미 존재하는 아이디입니다.");
          }
      } catch (error) {
          console.error("아이디 중복확인 실패:", error);
          setLoginIdCheck(false);
      }
    };

    const handleSystemNameCheck = async (event) => {
      //시스템명 중복 확인
      // true면 가능(중복없음)), false면 불가능
      event.stopPropagation();
      if (event.target.tagName === 'BUTTON') {
        if (inputValues.systemName === "") {
          alert("시스템명을 입력해주세요.");
          return;
        }
        console.log("시스템명 중복확인:", inputValues.systemName)
        try {
            const response = await ApiService.adminCheckSystemName( inputValues.loginId );
            console.log("시   스템명 중복확인 성공:", response);
            setSystemNameCheck(response);
            if(response) {
                alert("사용 가능한 시스템명입니다.");
            } else {
                alert("이미 존재하는 시스템명입니다.");
            }
        } catch (error) {
            console.error("아이디 중복확인 실패:", error);
            setSystemNameCheck(false);
        }
      }      
    };

  return (
    <RegistBoardPresenter
      inputValues={inputValues}
      isModalOpen={isModalOpen}
      handleInputChange={handleInputChange}
      handleSignUp={handleSignUp}
      setModalOpen={setModalOpen}
      navigate={navigate}
      loginIdCheck={loginIdCheck} 
      systemNameCheck ={systemNameCheck}
      handleLoginIdCheck={handleLoginIdCheck}
      handleSystemNameCheck={handleSystemNameCheck}
    />
  );
};

export default RegistBoardContainer;
