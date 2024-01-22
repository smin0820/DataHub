// SidebarPresenter.tsx
// 사이드바 프레젠터

import React from 'react';
import { SidebarUL, SNavLink, ToggleButton } from '@components/common/Sidebar/SidebarStyles';
import ReactDOM from 'react-dom';
import { System } from '@@types/Categories';

type SidebarPresenterProps = {
    systemNames: System[];
    selectedSystemId: number;
    isVisible: boolean;
    onSelectSystem: (systemId: number) => void;
    buttonTop: number;
    handleDragStart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleToggleClick: () => void;
}
const SidebarPresenter = ({ 
        systemNames,
        selectedSystemId,
        isVisible,
        onSelectSystem,
        buttonTop,
        handleDragStart,
        handleToggleClick 
    }: SidebarPresenterProps ) => {
    const sidebarContent = (
        <>
            <ToggleButton 
                id="sidebar-toggle-button"
                onMouseDown={handleDragStart}
                onClick={handleToggleClick} 
                $isVisible={isVisible}
                style={{ top: `${buttonTop}px` }} // 스타일 업데이트
            >
                {isVisible ? '<' : '>'} 
            </ToggleButton>
            <SidebarUL $isVisible={isVisible}>
                {systemNames.map((system) => (
                    <li key={system.systemId} onClick={() => onSelectSystem(system.systemId)}>
                        <SNavLink 
                            to={system.systemId === -1 ? '/admin' : '/system'}
                            className={selectedSystemId === system.systemId ? "chosen" : ""}
                        >
                            {system.systemName}
                        </SNavLink>
                    </li>
                ))}
            </SidebarUL>
        </>
    );

    return ReactDOM.createPortal(
        sidebarContent,
        document.getElementById('sidebar-root') as HTMLElement
    );
};

export default SidebarPresenter;