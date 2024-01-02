import { useState } from 'react';
import styled from 'styled-components';
import modify from "/assets/images/modify.png";
import RegistSysModal from '@components/regist/RegistSysModal';
import { useNavigate } from "react-router-dom";



const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: 50px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 30px;
`;

const SystemInfoBar = styled.div`
  box-sizing: border-box;
  border: 1px solid #DAE0E7;
  border-radius: 5px;
  width: 100%;
  background-color: #F3F6F9;
  text-align: left;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 0px;

  label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  input {
    padding: 10px;
    width: 100%;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 0px;
  }
`;


const InputContainer = styled.label`
  display: flex;
  flex-direction: column;
  background-color: #ffffffa0;
  border: none;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  & + & {
    margin-left: 10px;
  }

  span {
    margin-bottom: 10px;
  }

  input {
    border: 1px solid #DAE0E7;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    padding: 10px 20px;
    width: 85%;
    margin-right: 10px;
    &::placeholder {
      color: #DAE0E7;
    }
    &:disabled {
      background-color: #DAE0E7;
      &::placeholder {
        color: #7B91A7;
      }
    }
  }

  input:last-child {
    margin-right: 0;
  }

  p {
    position: absolute;
    right: 20px;
    bottom: 0px;
    font-size: 12px;
    margin: 0;
  }


`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 10px 30px;

  .group-button {
    padding: 10px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    width: 130px;
    height: 40px;

    &:first-child {
      background-color: #C7D0DD;
      color: white;
    }

    &:last-child {
      background-color: #003a75;
      color: white;
    }
  }
`;

const RequiredSpan = styled.span`
  &::after {
    content: " *";
    color: #007fff;
  }
`;

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

  return (
    <PageContainer>
      <Title>시스템 등록</Title>
      <Container>
        <SystemInfoBar><Icon src={modify} alt="modify.png"/>시스템 정보</SystemInfoBar>
        <Form>
          <FormRow>
            <InputContainer>
              <RequiredSpan>시스템명</RequiredSpan>
              <input type="text"
                name = "systemName"
                value={inputValues.systemName}
                onChange={handleInputChange}
                placeholder="시스템명"
              />
            </InputContainer>
            <InputContainer>
              <RequiredSpan>시스템 담당자</RequiredSpan>
              <input type="text" 
                name = "departmentName"
                value={inputValues.departmentName}
                onChange={handleInputChange}
                placeholder="시스템 담당자" 
              />
            </InputContainer>
            <InputContainer>
              <RequiredSpan>시스템 담당부서</RequiredSpan>
              <input type="text" 
                name = "department"
                value={inputValues.department}
                onChange={handleInputChange}
                placeholder="시스템 담당부서" 
              />
            </InputContainer>
          </FormRow>
          <FormRow>
              <InputContainer>
                  <span>업체명</span>
                  <input type="text" 
                    name = "companyName"
                    value={inputValues.companyName}
                    onChange={handleInputChange}
                    placeholder="업체명" 
                  />
              </InputContainer>
              <InputContainer>
                  <RequiredSpan>담당자</RequiredSpan>
                  <input type="text" 
                    name = "developerName"
                    value={inputValues.developerName}
                    onChange={handleInputChange}
                    placeholder="담당자" 
                />
              </InputContainer>
              <InputContainer>
                  <RequiredSpan>담당자 연락처</RequiredSpan>
                  <InputRow>
                      <input type="text" 
                        name = "contactNum"
                        value={inputValues.contactNum}
                        onChange={handleInputChange}
                        placeholder="000-0000-0000" 
                      />
                  </InputRow>
                  
              </InputContainer>
          </FormRow>
          <FormRow>
              <InputContainer>
                  <RequiredSpan>아이디</RequiredSpan>
                  <input type="text" 
                  name = "loginId"
                  value={inputValues.loginId}
                  onChange={handleInputChange}
                  placeholder="아이디"
                  />
                  <p>임시 비밀번호는 '아이디' 입니다.</p>
              </InputContainer>
              <InputContainer>
              </InputContainer>
              <InputContainer>
              </InputContainer>
          </FormRow>
          <FormRow>
              <InputContainer>    
              </InputContainer>
              <InputContainer>
              </InputContainer>
              <InputContainer>
              </InputContainer>
          </FormRow>
        </Form>
        <ButtonGroup>
          <button className="group-button"  onClick={()=> {navigate(-1)}}>취소</button>
          <button className="group-button" onClick={handleSignUp}>등록하기</button>
        {isModalOpen && <RegistSysModal closeModal={() => setModalOpen(false)} inputValues={inputValues} />}
        </ButtonGroup>
      </Container>
    </PageContainer>
  );
};

export default RegistBoardContainer;
