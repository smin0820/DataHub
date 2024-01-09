import { useState, useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { modalStateAtom } from '@recoil/atoms/modalStateAtom';

function useDropdown() {
    const [currentOpenDropdown, setCurrentOpenDropdown] = useState(null);
    const dropdownRefs = useRef(new Map());
    const isModalOpen = useRecoilValue(modalStateAtom);

    const toggleDropdown = (id) => {
        setCurrentOpenDropdown(current => current === id ? null : id);
    };

    const closeDropdown = () => {
        if (!isModalOpen) {
            setCurrentOpenDropdown(null);
        }
    };

    useEffect(() => {
        function handleOutsideClick(event) {
            if (currentOpenDropdown && !dropdownRefs.current.get(currentOpenDropdown)?.contains(event.target) && !isModalOpen) {
                closeDropdown();
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [currentOpenDropdown, isModalOpen]);

    return { currentOpenDropdown, toggleDropdown, dropdownRefs, closeDropdown };
}

export default useDropdown;
