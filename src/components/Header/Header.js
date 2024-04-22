import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="h-[8vh] relative flex items-center justify-between px-2 py-3 bg-[#131200] mb-2">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <MenuIcon style={{color: "white", cursor: "pointer"}} />
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              Live Bus Tracker
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
         
        </div>
      </nav>
    )
}

export default Header
