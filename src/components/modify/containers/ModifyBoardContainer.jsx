import { useEffect, useState } from 'react';

import styled from 'styled-components';
import modify from "/assets/images/modify.png";
import ModifySysModal from '@components/modify/ModifySysModal';
import { useNavigate } from 'react-router-dom';
import ApiService from '@components/axios/ApiService';



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

// const InputRow = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

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

const ModifyBoardContainer = () => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
      ApiService.fetchBaseCategory(currentSystemId)
        .then(data => {
          if (data && data.systemName) {
            setSystemName(data.systemName);
          }
        })
        .catch(error => {
          console.error('Error fetching system name:', error);
        });
    }, []);

    const validateForm = () => {
      if( !systemName || !departmentName || !department || !developerName || !contactNum || !password || !passwordCheck) {
        alert("모든 항목을 입력해주세요.");
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

  return (
    <PageContainer>
      <Title>정보 수정</Title>
      <Container>
        <SystemInfoBar><Icon src={modify} alt="modify.png"/>시스템 정보</SystemInfoBar>
        <Form>
          <FormRow>
            <InputContainer>
              <RequiredSpan>시스템명</RequiredSpan>
              <input 
                type="text" 
                placeholder={userInfo.systemName || "시스템명"}
                value={systemName}
                onChange={handleInputChange(setSystemName)}
              />
            </InputContainer>
            <InputContainer>
              <RequiredSpan>시스템 담당자</RequiredSpan>
              <input 
                type="text" 
                placeholder={userInfo.departmentName || "시스템 담당자"}
                value={departmentName}
                onChange={handleInputChange(setDepartmentName)}
              />
            </InputContainer>
            <InputContainer>
              <RequiredSpan>시스템 담당부서</RequiredSpan>
              <input 
                type="text" 
                placeholder={userInfo.department || "시스템 담당부서"}
                value={department}
                onChange={handleInputChange(setDepartment)}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
              <InputContainer>
                  <span>업체명</span>
                  <input 
                    type="text" 
                    placeholder={userInfo.companyName || "업체명"}
                    value={companyName}
                    onChange={handleInputChange(setCompanyName)}
                  />
              </InputContainer>
              <InputContainer>
                  <RequiredSpan>담당자</RequiredSpan>
                  <input 
                    type="text" 
                    placeholder={userInfo.developerName || "담당자"}
                    value={developerName}
                    onChange={handleInputChange(setDeveloperName)}
                    />
              </InputContainer>
              <InputContainer>
                  <RequiredSpan>담당자 연락처</RequiredSpan>
                  {/* <InputRow>
                      <input type="text" placeholder="담당자 연락처" />
                      <input type="text" placeholder="0000" />
                      <input type="text" placeholder="0000" />
                  </InputRow> */}
                  <input
                    type="text" 
                    placeholder={userInfo.contactNum || "담당자 연락처"}
                    value={contactNum}
                    onChange={handleInputChange(setContactNum)}
                  />
              </InputContainer>
          </FormRow>
          <FormRow>
              <InputContainer>
                  <RequiredSpan>아이디</RequiredSpan>
                  <input 
                    type="text" 
                    placeholder={userInfo.loginId || "아이디" }
                    value={loginId}
                    disabled
                  />
                  <p>아이디는 수정이 불가능합니다.</p>
              </InputContainer>
              <InputContainer>
                  <RequiredSpan>비밀번호</RequiredSpan>
                  <input 
                    type="password" 
                    placeholder="비밀번호"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                  />
              </InputContainer>
              <InputContainer>
              </InputContainer>
          </FormRow>
          <FormRow>
              <InputContainer>    
              </InputContainer>
              <InputContainer>
                  <RequiredSpan>비밀번호 확인</RequiredSpan>
                  <input 
                    type="password" 
                    placeholder="비밀번호 확인" 
                    value={passwordCheck}
                    onChange={handleInputChange(setPasswordCheck)}
                  />
              </InputContainer>
              <InputContainer>
              </InputContainer>
          </FormRow>
        </Form>
        <ButtonGroup>
          <button className="group-button" onClick={() => {navigate(-1)}}>취소</button>
          <button className="group-button" onClick={handleUpdateClick}>수정하기</button>
        {isModalOpen && <ModifySysModal 
          closeModal={() => setModalOpen(false)} 
          userData={{
            systemName,
            departmentName,
            department,
            companyName,
            developerName,
            contactNum,
            loginId,
            password
          }}
          />}
        </ButtonGroup>
      </Container>
    </PageContainer>
  );
};

export default ModifyBoardContainer;
