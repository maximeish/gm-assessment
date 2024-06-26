import React, { useState } from "react";

const Navigation = () => {
  const Menus = [
    { name: "Directions", icon: "bus-outline", dis: "translate-x-0" },
    { name: "Like", icon: "heart-outline", dis: "translate-x-16" },
    { name: "Profile", icon: "person-outline", dis: "translate-x-32" },
    { name: "Photos", icon: "camera-outline", dis: "translate-x-48" },
    {
      name: "Notifications",
      icon: "notifications-outline",
      dis: "translate-x-64",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="bg-[#C0C781] h-[10vh] max-h-[10vh] px-6 rounded-t-xl lg:w-[25vw] my-2">
      <ul className="flex relative">
        <span
          className={`bg-[#131200] duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute -top-5 rounded-full`}
        >
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 ${
                  i === active && "-mt-6 text-white"
                }`}
              >
                <ion-icon name={menu.icon}></ion-icon>
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-4 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
                } `}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
