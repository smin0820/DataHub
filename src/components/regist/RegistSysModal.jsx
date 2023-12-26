import React from "react";
import PropTypes from 'prop-types';
import RegistSysModalContainer from './containers/RegistSysModalContainer';

const RegistSysModal = ({ closeModal }) => {
    return(
        <RegistSysModalContainer closeModal={closeModal} />
    );
};

RegistSysModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default RegistSysModal;