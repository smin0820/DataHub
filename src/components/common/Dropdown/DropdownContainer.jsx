import React from 'react';
import DropdownPresenter from './DropdownPresenter';
import { useNavigate } from 'react-router-dom';

export default function DropdownContainer() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <DropdownPresenter handleLogout={handleLogout} navigate={navigate} />
    );
}

