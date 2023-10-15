import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const handleButtonClick = (modal_title, modal_message) => {
    setShowModal(true);
    setTitle(modal_title);
    setMessage(modal_message);
  };

  const closeModal = () => {
    setMessage("");
    setTitle("");
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{showModal, setShowModal, message, setMessage, title, setTitle, handleButtonClick, closeModal}}>
      {props.children}
    </ModalContext.Provider>
  );
};

