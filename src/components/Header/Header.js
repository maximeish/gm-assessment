import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ Switch }) {
  return (
    <nav className="h-[8vh] w-full relative flex items-center justify-between px-2 py-3 bg-[#131200] mb-2">
      <div className="px-4 mx-auto flex items-center justify-between">
        <MenuIcon
          style={{ color: "white", cursor: "pointer", marginRight: "1em" }}
        />
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start mr-4">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="/"
          >
            Live Bus Tracker
          </a>
        </div>
        <Switch />
      </div>
    </nav>
  );
}

export default Header;
