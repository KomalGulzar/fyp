import React from "react";
import { Menu } from "lucide-react";

const MenuButton = ({ onClick }) => {
  return (
    <button
      className="p-2 bg-[#0056B3] text-white rounded hover:bg-blue-800 fixed top-4 left-4 z-50"
      onClick={onClick}
    >
      <Menu size={24} />
    </button>
  );
};

export default MenuButton;
