import React from "react";

const CategorySelectBox = ({ category, filters, setFilters, showFilter }) => {
  const selectedValues = filters[category.name] || [];
  const { fields } = category;

  const handleChecked = (e) => {
    if (selectedValues.includes(e.target.value)) {
      setFilters({
        ...filters,
        [category.name]: selectedValues.filter(
          (value) => value !== e.target.value
        ),
      });
    } else {
      setFilters({
        ...filters,
        [category.name]: [...selectedValues, e.target.value],
      });
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
              name={field.name}
              onChange={handleChecked}
            />
            {field.displayName}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectBox;
