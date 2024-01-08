import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, CloseButton, ButtonGroup, TextAreaContainer, TextArea } from '@styles/ModalStyles';

const NoticeEditModalPresenter = ({ closeModal, title, handleTitleChange, body, handleBodyChange, handleSubmit}) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>공지사항 수정</ModalTitle>
                <ModalContent>제목</ModalContent>
                <TextAreaContainer>
                    <TextArea className='title-textarea'
                        placeholder="제목을 입력하세요."
                        value={title}
                        onChange={handleTitleChange}
                    />
                </TextAreaContainer>
                <ModalContent>본문</ModalContent>
                <TextAreaContainer>
                    <TextArea className='body-textarea' 
                        placeholder="본문을 입력하세요."
                        value={body}
                        onChange={handleBodyChange}
                    />
                </TextAreaContainer>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>수정하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default NoticeEditModalPresenter;