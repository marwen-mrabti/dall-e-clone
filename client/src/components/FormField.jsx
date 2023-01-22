import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  onChange,
  isSurpriseMe,
  handleOnSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <label htmlFor="name" className="block text-sm text-grey-900 font-medium">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            className="w-max bg-gray-700 hover:bg-gray-500
             text-slate-200 hover:text-slate-100 text-sm
              font-semibold px-4 py-2 rounded-md"
            onClick={handleOnSurpriseMe}
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className="bg-gray-50 border-2 border-gray-300
        rounded-lg text-lg text-gray-900 focus:ring-[#4649ff] focus:border-ring-[#4649ff] outline-none w-full p-3"
      />
    </div>
  );
};

export default FormField;
