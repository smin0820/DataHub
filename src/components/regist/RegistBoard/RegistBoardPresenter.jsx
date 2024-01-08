import React from "react";
import EditIcon from "@assets/images/EditIcon.png";
import CircleIcon from "@assets/images/CircleIcon.png";
import CheckCircleIcon from "@assets/images/CheckCircleIcon.png";
import RegistSysModalContainer from '@components/regist/modals/RegistSysModalContainer';
import { PageContainer, Title, Container, SystemInfoBar, Icon, Form, FormRow, InputContainer, InputContainerHeader, ButtonIconGroup, RequiredSpan, ButtonGroup } from "@styles/AccountManageStyles";

const RegistBoardPresenter = ({ inputValues, isModalOpen, handleInputChange, handleSignUp, setModalOpen, navigate, loginIdCheck, systemNameCheck  }) => {

    return (
        <PageContainer>
            <Title>시스템 등록</Title>
            <Container>
                <SystemInfoBar><Icon src={EditIcon} alt="EditIcon.png"/>시스템 정보</SystemInfoBar>
                <Form>
                    <FormRow>
                        <InputContainer>
                            <InputContainerHeader>                            
                                <RequiredSpan>시스템명</RequiredSpan>
                                <ButtonIconGroup>
                                    <Icon src={systemNameCheck ? CheckCircleIcon : CircleIcon} alt="시스템명중복확인"/>
                                    <button type="button" onClick={systemNameCheck} >중복확인</button>
                                </ButtonIconGroup>
                            </InputContainerHeader>
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
                            <input type="text" 
                                name = "contactNum"
                                value={inputValues.contactNum}
                                onChange={handleInputChange}
                                placeholder="000-0000-0000" 
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <InputContainer>
                            <InputContainerHeader>                            
                                <RequiredSpan>아이디</RequiredSpan>
                                <ButtonIconGroup>
                                    <Icon src={loginIdCheck ? CheckCircleIcon : CircleIcon} alt="아이디중복확인"/>
                                    <button type="button" onClick={loginIdCheck} >중복확인</button>
                                </ButtonIconGroup>
                            </InputContainerHeader>
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
                {isModalOpen && <RegistSysModalContainer closeModal={() => setModalOpen(false)} inputValues={inputValues} />}
            </ButtonGroup>
        </Container>
    </PageContainer>
    );
};
        
export default RegistBoardPresenter;