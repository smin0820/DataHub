// ModalComponent.jsx
import ReactDOM from 'react-dom';

const ModalComponent = ({ children }) => {
    return ReactDOM.createPortal(
        <div>{children}</div>,
        document.getElementById('modal-root')
    );
};

export default ModalComponent;
