import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";




const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();



   const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  
  const handleLogout = () => {
      localStorage.clear();
      clearUser();
      navigate("/login");
    };
    
    
    useEffect(() => {
      if (user) {
        setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
      }
    }, [user]);

  return (
    <div className="bg-white w-64 h-[calc(100vh-61px)] border-r border-gray-200/50 sticky top-[61px] z-20">
      {/* <ul>
        {sideMenuData.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer
              ${activeMenu === item.path ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul> */}

      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
            <img 
            src={user?.profileImageUrl || ""} 
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full" />
        </div>

        {user?.role === "admin" && (<div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5  rounded mt-1">Admin</div>)}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">{user?.name || ""}</h5>

        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>

      </div>

      {sideMenuData.map((item , index)=> (
        <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-[3px]" : ""}
        py-3 px-6 mb-3 cursor-pointer`}
        onClick={()=>handleClick(item.path)}
        >
            <item.icon className="text-xl" />
            {item.label}
        </button>
      ) )}




    </div>
  );
};

export default SideMenu;
