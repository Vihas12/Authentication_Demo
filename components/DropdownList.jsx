import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DropdownList = ({ label, items, renderItem, onSelect  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

   const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="w-full relative border border-gray-200 rounded-md py-2 px-6 bg-zinc-100/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white text-md text-gray-500 cursor-pointer"
      >
        {selectedItem ? (renderItem ? renderItem(selectedItem) : selectedItem) : label}
        {isOpen ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
      </button>

      {isOpen && (
        <ul className="absolute z-50 bg-white py-1 text-sm text-black max-h-96 overflow-auto grid grid-cols-1 gap-x-4 mt-1 w-full shadow-md rounded-md">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2 rounded"
            >
              {renderItem ? renderItem(item) : item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
