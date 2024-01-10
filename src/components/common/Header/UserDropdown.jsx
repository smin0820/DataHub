// UserDropdown.jsx
// 헤더에서 사용자 이름을 클릭하면 나오는 드롭다운 메뉴 컴포넌트입니다.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@components/login/Logout/useLogout';
import { Dropmenu } from '@styles/HeaderStyles'

export default function UserDropdown() {
    const navigate = useNavigate();
    const logout = useLogout();

    return (
        <Dropmenu>
            <ul>
                <li onClick={()=>{navigate('/modify')}}>정보수정</li>
                <li onClick={logout}>로그아웃</li>
            </ul>
        </Dropmenu>
    );
}
