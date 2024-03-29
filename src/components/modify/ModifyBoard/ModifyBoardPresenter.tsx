// ModifyBoardPresenter.tsx
// 시스템 정보 수정 페이지를 위한 프레젠터 컴포넌트

import React from "react";
import EditIcon from "@assets/images/EditIcon.png";
import CircleIcon from "@assets/images/CircleIcon.png";
import CheckCircleIcon from "@assets/images/CheckCircleIcon.png";
import ModifySysModalContainer from '@components/modify/modals/ModifySysModalContainer';
import { PageContainer, Title, Container, SystemInfoBar, Icon, Form, FormRow, InputContainer, InputContainerHeader, ButtonIconGroup, RequiredSpan, ButtonGroup, FormContent } from "@styles/AccountManageStyles";
import { UserInfo } from "@@types/UserInfo";

interface ModifyBoardPresenterProps {
    userInfo: UserInfo;
    currentSystemName: string;
    systemName: string;
    departmentName: string;
    department: string;
    companyName: string;
    developerName: string;
    contactNum: string;
    loginId: string;
    password: string;
    passwordCheck: string;
    setDepartmentName: (value: string) => void;
    setDepartment: (value: string) => void;
    setCompanyName: (value: string) => void;
    setDeveloperName: (value: string) => void;
    setContactNum: (value: string) => void;
    setPassword: (value: string) => void;
    setPasswordCheck: (value: string) => void;
    setModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
    handleInputChange: (func: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateClick: () => void;
    navigate: (value: number) => void;
    systemNameCheck: boolean;
    handleSystemNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkSystemName: () => void;
}

const ModifyBoardPresenter: React.FC<ModifyBoardPresenterProps> = ({ 
    userInfo, currentSystemName,
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
    }) => {

    return (
        <PageContainer>
            <Title>정보 수정</Title>
            <Container>
                <SystemInfoBar><Icon src={EditIcon} alt="EditIcon.png"/>시스템 정보</SystemInfoBar>
                <Form>
                    <FormRow>
                        <FormContent>
                            <InputContainerHeader>                            
                                <RequiredSpan>시스템명</RequiredSpan>
                                <ButtonIconGroup>
                                    <Icon src={systemNameCheck ? CheckCircleIcon : CircleIcon} alt="중복확인"/>
                                    <button type="button" onClick={checkSystemName} >중복확인</button>
                                </ButtonIconGroup>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="text" 
                                    placeholder={currentSystemName || "시스템명"}
                                    value={systemName}
                                    onChange={handleSystemNameChange}
                                    disabled={userInfo.role === "ADMIN"}
                                />
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>시스템 담당자</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>                       
                                <input 
                                    type="text" 
                                    placeholder={userInfo.departmentName || "시스템 담당자"}
                                    value={departmentName}
                                    onChange={handleInputChange(setDepartmentName)}
                                    disabled={userInfo.role === "ADMIN"}
                                />
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>시스템 담당부서</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="text" 
                                    placeholder={userInfo.department || "시스템 담당부서"}
                                    value={department}
                                    onChange={handleInputChange(setDepartment)}
                                    disabled={userInfo.role === "ADMIN"}
                                />
                            </InputContainer>
                        </FormContent>
                    </FormRow>
                    <FormRow>
                        <FormContent>
                            <InputContainerHeader>
                                <span>업체명</span>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="text" 
                                    placeholder={userInfo.companyName || "업체명"}
                                    value={companyName}
                                    onChange={handleInputChange(setCompanyName)}
                                    disabled={userInfo.role === "ADMIN"}
                                />
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>담당자</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="text" 
                                    placeholder={userInfo.developerName || "담당자"}
                                    value={developerName}
                                    onChange={handleInputChange(setDeveloperName)}
                                    disabled={userInfo.role === "ADMIN"}
                                    />
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>담당자 연락처</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>
                                <input
                                    type="text" 
                                    placeholder={userInfo.contactNum || "담당자 연락처"}
                                    value={contactNum}
                                    onChange={handleInputChange(setContactNum)}
                                    disabled={userInfo.role === "ADMIN"}
                                />
                            </InputContainer>
                        </FormContent>
                    </FormRow>
                    <FormRow>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>아이디</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="text" 
                                    placeholder={userInfo.loginId || "아이디" }
                                    value={loginId}
                                    disabled
                                />
                                <p>아이디는 수정이 불가능합니다.</p>
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>비밀번호</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="password" 
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                />
                                {userInfo.role === 'ADMIN' && (
                                    <p>관리자는 비밀번호만 변경 가능합니다.</p>
                                )}
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                        </FormContent>
                    </FormRow>
                    <FormRow>
                        <FormContent>
                        </FormContent>
                        <FormContent>
                            <InputContainerHeader>
                                <RequiredSpan>비밀번호 확인</RequiredSpan>
                            </InputContainerHeader>
                            <InputContainer>
                                <input 
                                    type="password" 
                                    placeholder="비밀번호 확인" 
                                    value={passwordCheck}
                                    onChange={handleInputChange(setPasswordCheck)}
                                />
                            </InputContainer>
                        </FormContent>
                        <FormContent>
                        </FormContent>
                    </FormRow>
                </Form>
                <ButtonGroup>
                <button type="button" className="group-button" onClick={() => {navigate(-1)}}>취소</button>
                <button type="button" className="group-button" onClick={handleUpdateClick}>수정하기</button>
                {isModalOpen && <ModifySysModalContainer 
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
        
export default ModifyBoardPresenter;