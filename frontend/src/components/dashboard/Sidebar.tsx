"use client"
import React from "react";
import SideMenuItem from "./SideMenu";
import { HomeIcon } from "@heroicons/react/24/outline";

interface ISideMenuList {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  link: string;
}

const SideMenuList: ISideMenuList[] = [
  {
    icon: HomeIcon,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: HomeIcon,
    name: "Restaurant",
    link: "/dashboard/restaurant",
  },
];

const SideBar = () => {
  return (
    <div className="w-14 md:w-[250px] bg-red-500 text-white">
      <div className="flex justify-center content-center">
        <div className=" w-14 md:w-[250px] text-center p-5">
          {SideMenuList.map((item, index) => {
            return <SideMenuItem item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
