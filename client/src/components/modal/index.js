import React, { useCallback } from "react";
import { Container, ModalContainer, CloseButton } from "./styled";
import PropTypes from "prop-types";

function Modal({ children, show, close, style, useCloseButton }) {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Container onClick={close}>
      <ModalContainer onClick={stopPropagation} style={style}>
        {useCloseButton && <CloseButton onClick={close}>&times;</CloseButton>}
        {children}
      </ModalContainer>
    </Container>
  );
}

Modal.defaultProps = {
  useCloseButton: true,
};

Modal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  style: PropTypes.any,
};

export default Modal;
