import React from "react";
import EditIcon from "@assets/images/EditIcon.png";
import CircleIcon from "@assets/images/CircleIcon.png";
import CheckCircleIcon from "@assets/images/CheckCircleIcon.png";
import { PageContainer, Title, Container, SystemInfoBar, Icon, Form, FormRow, InputContainer, InputContainerHeader, ButtonIconGroup, RequiredSpan, ButtonGroup, FormContent } from "@styles/AccountManageStyles";
import SystemModifyModalContainer from "../modals/SystemModifyModalContainer";

const SystemModifyPresenter = ({ userInfo, systemName, departmentName, department, companyName, developerName, contactNum, loginId, password, passwordCheck,
    setSystemName, setDepartmentName, setDepartment, setCompanyName, setDeveloperName, setContactNum, setPassword, setPasswordCheck, 
    setModalOpen, isModalOpen, handleInputChange, handleUpdateClick, navigate, systemNameCheck, handleSystemNameChange, checkSystemName, systemInfo  }) => {

    return (
        <PageContainer>
            <Title>{systemInfo.selectedsystemName} 정보 수정</Title>
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
                                    placeholder={userInfo.systemName || "시스템명"}
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
                {isModalOpen && <SystemModifyModalContainer
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
        
export default SystemModifyPresenter;