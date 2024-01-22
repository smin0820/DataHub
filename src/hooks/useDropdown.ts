import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { modalStateAtom } from "@recoil/atoms/modalStateAtom";

function useDropdown() {
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<number | null>(
    null
  );
  const dropdownRefs = useRef<Map<number, HTMLTableCellElement | null>>(
    new Map()
  );

  const isModalOpen = useRecoilValue(modalStateAtom);

  const toggleDropdown = (id: number) => {
    setCurrentOpenDropdown((current) => (current === id ? null : id));
  };

  const closeDropdown = () => {
    if (!isModalOpen) {
      setCurrentOpenDropdown(null);
    }
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        currentOpenDropdown !== null &&
        !dropdownRefs.current
          .get(currentOpenDropdown)
          ?.contains(event.target as Node) &&
        !isModalOpen
      ) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [currentOpenDropdown, isModalOpen]);

  return { currentOpenDropdown, toggleDropdown, dropdownRefs, closeDropdown };
}

export default useDropdown;
