import React from "react";

const AddressLine = ({
  name,
  phone,
  address,
  isDefault = false,
  onUpdate = null,
  onDelete = null,
}) => {
  return (
    <div className="flex flex-row justify-between items-center border border-gray-300 p-4 rounded-lg">
      <div className="flex flex-col gap-2 items-start w-5/6">
        {isDefault && (
          <span className="inline-block px-2 py-0.5 max-w-14 text-xs border border-red-500 text-red-500 rounded">
            Default
          </span>
        )}
        <div className="flex-shrink-0">Name: {name}</div>
        <div className="flex-shrink-0">Phone number: {phone}</div>
        <div className="text-sm text-gray-600">Address: {address}</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        {onUpdate && (
          <button
            type="button"
            className="text-sm text-blue-500"
            onClick={onUpdate}
          >
            Update
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className="text-sm text-red-500"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressLine;
