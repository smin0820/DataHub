// ModalComponent.jsx
// 모달을 DOM 트리의 최상위 노드에 렌더링하는 컴포넌트입니다.

import ReactDOM from 'react-dom';

const ModalComponent = ({ children }) => {
    return ReactDOM.createPortal(
        <div>{children}</div>,
        document.getElementById('modal-root')
    );
};

export default ModalComponent;
