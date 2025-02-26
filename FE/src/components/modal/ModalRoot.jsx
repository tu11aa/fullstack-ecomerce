import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { MODAL_TYPES, useModal } from "../../contexts/modal/ModalContext";
import FormModal from "./FormModal";
import ConfirmationModal from "./ConfirmationModal";
import AlertModal from "./AlertModal";

const ModalRoot = () => {
  const { modalState, closeModal, cleanupModal } = useModal();
  const { isOpen, type, props, component: CustomComponent } = modalState;
  const modalRef = useRef(null);

  // Handle keyboard events (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling on the background
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeModal]);

  // Cleanup effect when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(cleanupModal, 300); // adjust timeout to match your animation duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen, cleanupModal]);

  // Handle outside clicks
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Render different modal components based on type
  const renderModalContent = () => {
    const handleClose = () => {
      if (modalState.props && modalState.props.onClose) {
        modalState.props.onClose();
      }
      closeModal();
    };

    if (CustomComponent) {
      return <CustomComponent {...props} onClose={handleClose} />;
    }

    switch (type) {
      case MODAL_TYPES.CONFIRMATION:
        return <ConfirmationModal {...props} onClose={handleClose} />;
      case MODAL_TYPES.FORM:
        return <FormModal {...props} onClose={handleClose} />;
      case MODAL_TYPES.ALERT:
        return <AlertModal {...props} onClose={handleClose} />;
      default:
        return null;
    }
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl transform transition-transform ${
          isOpen ? "scale-100" : "scale-95"
        } max-w-md w-full max-h-[90vh] overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalContent()}
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
};

export default ModalRoot;
