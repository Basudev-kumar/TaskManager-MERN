// components/Inputs/SelectDropdown

import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

//   const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button
        // type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-black outline-none flex items-center justify-between px-3 py-2.5 border border-slate-100 rounded-md mt-2 bg-white"
      >
        {value ? options.find ((opt)=> opt.value === value) ?.label : placeholder}
        <span className="ml-2">{isOpen ? <LuChevronDown className="rotate-180" /> : <LuChevronDown />}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-slate-100 rounded-md shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
