import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import styled from "styled-components";

import setModalContentHeight from "../utils/setModalContentHeight";

ReactModal.setAppElement("#root");

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: ${(props) => props.height || 300}px;

  .modal-content-title {
    margin: 10px;
    padding: 10px 20px;
    border-bottom: 1px solid #000000;
    font-size: 30px;
    text-align: center;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    margin: 20px 0;
  }

  .modal-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 15px;
    cursor: pointer;
  }
`;

function ModalContainer({
  isOpen,
  title,
  width = 600,
  height = 300,
  children,
  onClose,
}) {
  const style = setModalContentHeight(height, width);

  function handleModalCloseClick() {
    onClose(false);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleModalCloseClick}
      style={style}
    >
      <ModalContent height={height}>
        <div className="modal-content-title">{title}</div>
        <div className="modal-content">{children}</div>
        <button onClick={handleModalCloseClick} className="modal-close-button">
          X
        </button>
      </ModalContent>
    </ReactModal>
  );
}

ModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalContainer;
