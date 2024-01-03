import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AdminSearchContainer from '@components/admin/containers/AdminSearchContainer';
import FileUploadModalContainer from "@components/common/modals/FileUploadModal/FileUploadModalContainer";
import ApiService from "@components/axios/ApiService";
import TabMenuContainer from "@components/system/containers/tabmenu/TabMenuContainer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  div {
    width: 100%;
    max-width: 1000px;
    h3 {
        margin-bottom: 30px;
    }
  }
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    gap: 4rem;
  }
  li {
    border: 2px solid black;
    padding: 7px 35px;
    border-bottom: none;
    cursor: pointer;
  }
  .focused {
    border: 2px solid #4DBDE5;
    border-bottom: none;
  }
  button {
      padding: 5px 10px;
      color: white;
      background-color: #007FFF;
      border: 1px solid #007FFF;
      border-radius: 10px;
      font-size: medium;
      cursor: pointer;
      float: right;
    }
`;


export default function SystemTabMenuContainer() {
    const menu = ['표준 정의서', '구축 정의서', '진단 보고서'];
    const [tab, setTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [systemName, setSystemName ] = useState('');
    const [systemId, setSystemId] = useState(null);

    const [baseCategoryIds, setBaseCategoryIds] = useState([]);
    const [detailCategories, setDetailCategories] = useState([]);

    useEffect(() => {
        const savedTab = localStorage.getItem('currentTab');
          if (savedTab !== null) {
              setTab(Number(savedTab));
          }
        // localStorage에서 userInfo 가져오기
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let currentSystemId = userInfo?.systemIds?.[0]; // 기본 시스템 ID 설정

        // ADMIN 사용자인 경우, 선택한 시스템 ID로 변경
        if (userInfo?.role === "ADMIN") {
            const selectedSystem = JSON.parse(localStorage.getItem("selectedSystemId"));
            if (selectedSystem?.systemId) {
                currentSystemId = selectedSystem.systemId;
            }
        }

        // currentSystemId를 사용하여 시스템 이름 및 기타 정보 가져오기
        if (currentSystemId) {
            setSystemId(currentSystemId);
            ApiService.fetchBaseCategory(currentSystemId)
                .then(data => {
                    if (data?.systemName) {
                        setSystemName(data.systemName);
                    }
                    if (data?.baseCategories) {
                        setBaseCategoryIds(data.baseCategories.map(category => category.baseCategoryId));
                        // detailCategories 정보 가져오기
                        Promise.all(data.baseCategories.map(category => 
                            ApiService.fetchDetailCategories(category.baseCategoryId)
                        )).then(allDetailData => {
                            setDetailCategories(allDetailData.map(data => data.detailCategories));
                        });
                    }
                })
                .catch(error => {
                    console.error('Base category 요청 오류:', error);
                });
        }
    }, []);
    
    useEffect(() => {
        if (systemId !== null) {
            ApiService.fetchBaseCategory(systemId)
                .then(data => {
                    if (data && data.baseCategories) {
                        setBaseCategoryIds(data.baseCategories.map(category => category.baseCategoryId));
                        // 모든 baseCategoryId에 대해 detailCategories 정보 가져오기
                        Promise.all(data.baseCategories.map(category => 
                            ApiService.fetchDetailCategories(category.baseCategoryId)
                        )).then(allDetailData => {
                            setDetailCategories(allDetailData.map(data => data.detailCategories));
                        });
                    }
                })
                .catch(error => {
                    console.error('Base category 요청 오류:', error);
                });
        }
    }, [systemId]);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const handleTabChange = (newTab) => {
      setTab(newTab);
      // 로컬 스토리지에 현재 탭 상태 저장
      localStorage.setItem('currentTab', newTab);
  };

  return (
    <Container>
      <div>
        <h3>{systemName || '시스템 이름 로딩 중...'}</h3>
        <ul>
          {menu.map((e, i) => (
            <li
              key={i}
              className={i === tab ? "focused" : null}
              onClick={() => handleTabChange(i)}
            >
              {e}
            </li>
          ))}
        </ul>

        <AdminSearchContainer></AdminSearchContainer>
        
        <button onClick={openModal}>게시글 등록</button>

        {isModalOpen && (
          <>
            {tab === 0 && <FileUploadModalContainer closeModal={() => setIsModalOpen(false)} detailCategories={detailCategories[0]} />}
            {tab === 1 && <FileUploadModalContainer closeModal={() => setIsModalOpen(false)} detailCategories={detailCategories[1]} />}
            {tab === 2 && <FileUploadModalContainer closeModal={() => setIsModalOpen(false)} detailCategories={detailCategories[2]} />}
          </>
        )}
        {tab === 0 ? (
          <TabMenuContainer detailCategories={detailCategories[0]} />
        ) : tab === 1 ? (
          <TabMenuContainer detailCategories={detailCategories[1]} />
        ) : (
          <TabMenuContainer detailCategories={detailCategories[2]} />
        )}
      </div>
    </Container>
  );
}