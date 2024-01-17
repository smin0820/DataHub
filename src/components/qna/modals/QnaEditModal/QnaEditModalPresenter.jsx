import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ButtonGroup, CloseButton, TextAreaContainer, TextArea } from '@styles/ModalStyles';

const QnaEditModalPresenter = ({ closeModal, handleTitleChange, handleBodyChange, handleSubmit, title, content }) => {
    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ModalTitle>Q&A 수정</ModalTitle>
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
                        value={content}
                        onChange={handleBodyChange}
                    />
                </TextAreaContainer>
                <ButtonGroup>
                    <button className="double" onClick={closeModal}>취소하기</button>
                    <button className="double" onClick={handleSubmit}>수정하기</button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    )
};

export default QnaEditModalPresenter;