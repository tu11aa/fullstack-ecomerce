import React, { useState } from "react";

const FormModal = ({ title, fields, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{title || "Form"}</h2>
      <form onSubmit={handleSubmit}>
        {fields &&
          fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                id={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required={field.required}
              />
            </div>
          ))}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
