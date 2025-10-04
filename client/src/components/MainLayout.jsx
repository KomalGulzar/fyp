import React, { useState } from "react";
import MenuButton from "./MenuButton";
import Sidebar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";


const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <Sidebar currentUser={currentUser} />}
      <div className="flex-1 bg-gray-100">
        <MenuButton onClick={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
