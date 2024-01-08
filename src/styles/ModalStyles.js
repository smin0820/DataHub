import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 100%;
`;

export const ModalContainer = styled.div`
    background-color: white;
    padding: 0px;
    border-radius: 10px;
    width: 600px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    position: relative;
    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: #7b91a7;
        position: absolute;
        top: 50px;
    }
    &.small {
        height: 200px;
    }
    &.medium {
        height: 400px;
    }
    &.standard {
        height: 600px;
    }
`;

export const ModalTitle = styled.h2`
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    margin-bottom: 40px;
    margin-top: 15px;
    margin-left: 20px;
`;

export const ModalContent = styled.p`
    font-size: 16px;
    text-align: left;
    margin-bottom: 5px;
    margin-left: 30px;
`;

export const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    right: 25px;
    top: 10px;
    font-size: 24px;
    width: 10px ;
    cursor: pointer;
    padding: 5px;
    line-height: 1;
    display: inline-block;
    transition: 0.3s;
    color: #000000;
    &:hover {
        color: #007fff;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    .single {
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 10px;
        width: 520px;
        height: 35px;   
        margin-right: 0px;
        background-color: #003a75;
        color: white;
    }
    .double {
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 10px;
        width: 300px;
        height: 35px;   
        &:first-child {
            margin-left: 0px;
            background-color: #7B91A7;
            color: black;
        }
        &:last-child {
            margin-right: 0px;
            background-color: #003a75;
            color: white;
        }
    }
`;

export const TextAreaContainer = styled.div`
    display: flex; 
    justify-content: center;
    width: 100%;
`;

export const TextArea = styled.textarea`
    width: 85%;
    height: 30px;
    resize: none;
    padding: 10px;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 5px;    
    &:focus {
        outline: none;
        border-color: #007fff;
    }
    &::placeholder {
        line-height: 30px;
        text-align: center;
    }
    &:not(:placeholder-shown) {
        line-height: normal;
    }
    &.title-textarea {
        height: 30px;
        &::placeholder {
            line-height: 30px;
        }
    }
    &.body-textarea {
        height: 300px;
        &::placeholder {
            line-height: 300px;
        }
    }
    &.check-textarea {
        height: 200px;
        &::placeholder {
            line-height: 200px;
        }
    }
`;

export const RadioGroup = styled.div`
    display: flex;
    margin-top: 10px;
    margin-left: 30px;
    margin-bottom: 30px;
    width: auto;
    &.row-radiogroup {
        flex-direction: row;
    }
    &.column-radiogroup {
        flex-direction: column;
    }
`;

export const RadioButton = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: auto;
    label {
        margin-left: 10px;
    }
    &.check-radiobutton{
        margin-right: 20px;
        .approve-label {
        color: #4dd392;
        }
        .reject-label {
        color: red;
        }
    }
    &.file-radiobutton{
        margin-left: 5px;
    }
`;

export const FileUpload = styled.div`
    margin-top: 10px;
    margin-left: 30px;
    label {
        display: block;
        margin-bottom: 5px;
    }
    input[type="file"] {
        margin-top: 10px;
        display: block;
        padding: 5px;
        width: 250px;
        font-size: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }
    input[type="file"]::file-selector-button {
        background-color: #D9D9D9;
        border-radius: 5px;
        border: 1px solid #101418;
    }
`;