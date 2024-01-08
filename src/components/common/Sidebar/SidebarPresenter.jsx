// SidebarPresenter.jsx
// 사이드바 프레젠터

import React from 'react';
import { SidebarUL, SNavLink, ToggleButton } from '@styles/SidebarStyles';

const SidebarPresenter = ({ systemNames, selectedSystemId, isVisible, onToggleSidebar, onSelectSystem }) => {
    return (
        <>
        <ToggleButton onClick={() => onToggleSidebar(!isVisible)} $isVisible={isVisible}>
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
};

export default SidebarPresenter;