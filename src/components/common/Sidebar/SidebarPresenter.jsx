// SidebarPresenter.jsx
// 사이드바 프레젠터

import React from 'react';
import { SidebarUL, SNavLink, ToggleButton } from '@styles/SidebarStyles';
import ReactDOM from 'react-dom';

const SidebarPresenter = ({ 
        systemNames, selectedSystemId, isVisible, onToggleSidebar, onSelectSystem, buttonTop, handleDragStart, handleToggleClick 
    }) => {
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
                    <li key={system.id} onClick={() => onSelectSystem(system.id)}>
                        <SNavLink 
                            to={system.id === 'admin' ? '/admin' : '/system'}
                            className={selectedSystemId === system.id ? "chosen" : ""}
                        >
                            {system.name}
                        </SNavLink>
                    </li>
                ))}
            </SidebarUL>
        </>
    );

    return ReactDOM.createPortal(
        sidebarContent,
        document.getElementById('sidebar-root')
    );
};

export default SidebarPresenter;