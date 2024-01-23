// SystemTabMenu.tsx
// 시스템 페이지(/system)의 탭 메뉴를 담당하는 컴포넌트입니다.

import React from "react";
import { TabMenuContainer } from "@components/system/styles/SystemStyles"
import FileUploadModalContainer from "@components/common/modals/FileUploadModal/FileUploadModalContainer";
import { DetailCategory } from "@@types/Categories";
import TabMenuTableContainer from "./containers/TabMenuTableContainer";

type SystemTabMenuProps = {
    menu: string[];
    tab: number;
    handleTabChange: (index: number) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    systemName: string;
    detailCategories: DetailCategory[][];
    openModal: () => void;
};

const SystemTabMenu = ({
        menu,
        tab,
        handleTabChange,
        isModalOpen,
        setIsModalOpen,
        systemName,
        detailCategories,
        openModal,
    }: SystemTabMenuProps) => {
    return (
        <TabMenuContainer>
            <div>
                <h3>{systemName || '시스템 이름 로딩 중...'}</h3>
                <ul>
                {menu.map((e, i) => (
                    <li
                    key={i}
                    className={i === tab ? "focused" : undefined}
                    onClick={() => handleTabChange(i)}
                    >
                    {e}
                    </li>
                ))}
                </ul>
                
                <button onClick={openModal}>게시글 등록</button>

                {isModalOpen && (
                <>
                    {tab === 0 && <FileUploadModalContainer closeModal={() => setIsModalOpen(false)} detailCategories={detailCategories[0]} />}
                    {tab === 1 && <FileUploadModalContainer closeModal={() => setIsModalOpen(false)} detailCategories={detailCategories[1]} />}
                    {tab === 2 && <FileUploadModalContainer closeModal={() => setIsModalOpen(false)} detailCategories={detailCategories[2]} />}
                </>
                )}
                {tab === 0 ? (
                <TabMenuTableContainer detailCategories={detailCategories[0]} />
                ) : tab === 1 ? (
                <TabMenuTableContainer detailCategories={detailCategories[1]} />
                ) : (
                <TabMenuTableContainer detailCategories={detailCategories[2]} />
                )}
            </div>
        </TabMenuContainer>
    );
};

export default SystemTabMenu;