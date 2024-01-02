import React from "react";
import PropTypes from 'prop-types';
import RegistSysModalContainer from './containers/RegistSysModalContainer';

const RegistSysModal = ({ closeModal, inputValues }) => {
    return(
        <RegistSysModalContainer closeModal={closeModal} inputValues={inputValues} />
    );
};

RegistSysModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default RegistSysModal;