// SystemTabMenuContainer.tsx
// 시스템 페이지(/system)의 탭 메뉴를 담당하는 컴포넌트입니다.

import React, { useState, useEffect } from "react";
import ApiService from "@components/axios/ApiService";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "@recoil/atoms/userStateAtom";
import { selectedSystemIdState } from "@recoil/atoms/systemStateAtom";
import { systemUploadState } from "@recoil/atoms/systemUploadStateAtom";
import SystemTabMenu from "@components/system/SystemTabMenu";
import { BaseCategory, DetailCategory } from "@@types/Categories"


const SystemTabMenuContainer = () => {
    const menu = ['표준 정의서', '구축 정의서', '진단 보고서']; // 탭 메뉴
    const [tab, setTab] = useState<number>(0); // 현재 탭 번호
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 오픈 여부
    const [systemName, setSystemName ] = useState<string>(''); // 시스템 이름
    const [systemId, setSystemId] = useState<number>(); // 시스템 아이디
    const [baseCategoryIds, setBaseCategoryIds] = useState<BaseCategory[]>([]); // 기본 카테고리 아이디
    const [detailCategories, setDetailCategories] = useState<DetailCategory[][]>([]); // 기본 카테고리 아이디에 따른 세부 카테고리 정보
    const userInfo = useRecoilValue(userState); // 유저 정보
    const [selectedSystemId, setSelectedSystemId] = useRecoilState(selectedSystemIdState); // 선택된 시스템 아이디
    const systemUpload = useRecoilValue(systemUploadState); // 업로드 완료 확인용

    useEffect(() => {
      // 선택된 시스템 아이디가 존재하면 해당 시스템의 기본 카테고리 정보를 가져옴
      if (userInfo.role === "USER") { // 일반 사용자인 경우
        setSelectedSystemId(userInfo.systemIds[0]);
      }
      if (selectedSystemId) { // 관리자인 경우에는 선택된 시스템 아이디가 변경될 수 있음
        ApiService.fetchBaseCategory(selectedSystemId)
          .then(data => {
            if (data?.systemName) {
              // 시스템 이름 설정
              setSystemName(data.systemName);
            }
            if (data?.baseCategories) {
              // 기본 카테고리 아이디 설정(탭 메뉴)
              setBaseCategoryIds(data.baseCategories.map((category: BaseCategory) => category.baseCategoryId));
              // 모든 baseCategoryId에 대해 detailCategories 정보 가져오기
              Promise.all(data.baseCategories.map((category: BaseCategory) => 
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
    }, [selectedSystemId, systemUpload, systemId]);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const handleTabChange = (newTab: number) => {
      setTab(newTab);
      // 로컬 스토리지에 현재 탭 상태 저장
      localStorage.setItem('currentTab', newTab.toString());
  };
  return (
    <SystemTabMenu
      menu={menu}
      tab={tab}
      handleTabChange={handleTabChange}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      systemName={systemName}
      detailCategories={detailCategories}
      openModal={openModal}
    />
  );
}

export default SystemTabMenuContainer;