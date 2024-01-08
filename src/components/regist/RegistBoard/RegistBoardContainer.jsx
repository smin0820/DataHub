import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RegistBoardPresenter from '@components/regist/RegistBoard/RegistBoardPresenter';

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
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      //input 값이 변경될 때 호출되는 함수
      const { name, value } = e.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [name] : value,
      }));
    };

    const handleSignUp = () => {
      //입력 값이 비어있는지 확인
      if (!inputValues.systemName || !inputValues.departmentName || !inputValues.department || !inputValues.developerName || !inputValues.contactNum || !inputValues.loginId)  {
        alert('모든 값을 입력해주세요.');
        return; // 등록을 못하게 만듦
      }
      
      setModalOpen(true);
    };

    const loginIdCheck = () => {
      //아이디 중복 확인
      // true면 가능(중복없음)), false면 불가능
      alert('중복확인');
      return true;
    }

    const systemNameCheck = () => {
      //시스템명 중복 확인
      // true면 가능(중복없음)), false면 불가능
      alert('중복확인');
      return true;
    }

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
    />
  );
};

export default RegistBoardContainer;
