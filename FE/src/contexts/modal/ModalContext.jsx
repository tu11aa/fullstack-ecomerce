import React, { createContext, useContext, useState, useCallback } from "react";
import ModalRoot from "../../components/modal/ModalRoot";

// Create the context
const ModalContext = createContext(null);

// Modal types for better type safety
export const MODAL_TYPES = {
  CONFIRMATION: "CONFIRMATION",
  FORM: "FORM",
  ALERT: "ALERT",
  CUSTOM: "CUSTOM",
};

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    props: {},
    component: null,
  });

  // Open modal with type, props, and optional custom component
  const openModal = useCallback((type, props = {}, component = null) => {
    setModalState({
      isOpen: true,
      type,
      props,
      component,
    });
  }, []);

  // Close the modal
  const closeModal = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  }, []);

  // Clean up the modal state completely after animations
  const cleanupModal = useCallback(() => {
    if (!modalState.isOpen) {
      setModalState({
        isOpen: false,
        type: null,
        props: {},
        component: null,
      });
    }
  }, [modalState.isOpen]);

  const value = {
    modalState,
    openModal,
    closeModal,
    cleanupModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default ModalProvider;
