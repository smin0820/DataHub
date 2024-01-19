// ModalComponent.tsx
// 모달을 DOM 트리의 최상위 노드에 렌더링하는 컴포넌트입니다.

import ReactDOM from 'react-dom';
import React, { ReactNode } from 'react';

interface ModalComponentProps {
    children: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ children }) => {
    const modalRoot = document.getElementById('modal-root') as HTMLElement;

    return ReactDOM.createPortal(
        <div>{children}</div>,
        modalRoot
    );
};

export default ModalComponent;
