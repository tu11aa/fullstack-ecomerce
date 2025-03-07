import React from "react";

const AlertModal = ({ title, message, onClose }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{title || "Alert"}</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
