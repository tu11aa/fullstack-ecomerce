import React from "react";

const ConfirmationModal = ({ title, message, onConfirm, onClose }) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{title || "Confirmation"}</h2>
      <p className="mb-6">{message || "Are you sure you want to proceed?"}</p>
      <div className="flex justify-end space-x-3">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
