import { ModalOverlay, ModalContainer, ModalTitle, CloseButton, ModalContent, ButtonGroup, TextAreaContainer, TextArea } from '@styles/ModalStyles';

const QnaRegisterModalPresenter = ({ closeModal, Title, handleTitleChange, Body, handleBodyChange, handleSubmit }) => {
    return (
                    <ModalOverlay onClick={closeModal}>
                <ModalContainer className="standard" onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>
                    <ModalTitle>새로운 Qna 작성</ModalTitle>
                    <ModalContent>제목</ModalContent>
                    <TextAreaContainer>
                        <TextArea className='title-textarea'
                            placeholder="제목을 입력하세요." 
                            value={Title}
                            onChange={handleTitleChange}
                        />
                    </TextAreaContainer>
                    <ModalContent>본문</ModalContent>
                    <TextAreaContainer>
                        <TextArea className='body-textarea'
                            placeholder="본문을 입력하세요." 
                            value={Body}
                            onChange={handleBodyChange}
                        />
                    </TextAreaContainer>
                    <ButtonGroup>
                        <button className="double" onClick={closeModal}>취소하기</button>
                        <button className="double" onClick={handleSubmit}>등록하기</button>
                    </ButtonGroup>
                </ModalContainer>
            </ModalOverlay>
    )
};

export default QnaRegisterModalPresenter;