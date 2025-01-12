import React from "react";

const CategorySelectBox = ({ category, values, onChange_, showFilter }) => {
  const { fields } = category;

  const handleChecked = (e) => {
    if (values.includes(e.target.value)) {
      onChange_(
        category.name,
        values.filter((value) => value !== e.target.value)
      );
    } else {
      onChange_(category.name, [...values, e.target.value]);
    }
  };

  return (
    <div
      className={`border border-gray-300 pl-5 py-3 mt-6 ${
        !showFilter ? "hidden" : ""
      }`}
    >
      <p className="mb-3 text-sm font-medium">{category.displayName}</p>

      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        {fields.map((field, index) => (
          <p className="flex gap-2" key={index}>
            <input
              className="w-3"
              type="checkbox"
              value={field.value}
              name={field.value}
              onChange={handleChecked}
              checked={values ? values.includes(field.value) : false}
            />
            {field.displayName}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectBox;
