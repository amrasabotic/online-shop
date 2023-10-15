import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ModalComponent = ({ title, message, showModal, closeModal }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
