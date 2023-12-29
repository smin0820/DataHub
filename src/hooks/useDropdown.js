import { useState, useRef, useEffect } from 'react';

function useDropdown() {
    const [currentOpenDropdown, setCurrentOpenDropdown] = useState(null);
    const dropdownRefs = useRef(new Map());

    const toggleDropdown = (id) => {
        setCurrentOpenDropdown(current => current === id ? null : id);
    };

    const closeDropdown = () => {
        setCurrentOpenDropdown(null);
    };

    useEffect(() => {
        function handleOutsideClick(event) {
            if (currentOpenDropdown && !dropdownRefs.current.get(currentOpenDropdown)?.contains(event.target)) {
                closeDropdown();
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [currentOpenDropdown]);

    return { currentOpenDropdown, toggleDropdown, dropdownRefs, closeDropdown };
}

export default useDropdown;
