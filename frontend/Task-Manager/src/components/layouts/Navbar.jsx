import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";


const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        {/* Mobile menu toggle button */}
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
            {openSideMenu ? (<HiOutlineX className="text-2xl" />) : (<HiOutlineMenu className="text-2xl" />)}
          
        </button>

        <h2 className="text-lg font-medium text-black">Task Manager</h2>

      {/* Mobile side menu (only shows when openSideMenu is true) */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white shadow-lg">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
