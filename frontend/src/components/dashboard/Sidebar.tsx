"use client";
import React from "react";
import SideMenuItem from "./SideMenu";
import { HomeIcon } from "@heroicons/react/24/outline";
import {Divider} from "@heroui/divider";

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
    <div className="w-14 md:w-[250px]  bg-gradient-to-bl from-[#42424A] to-[#191919] shadow-lg  shadow-slate-800  text-white rounded-sm h-[97%] ml-3 my-3">
      <div className="py-5 pl-10 text-xl font-bold cursor-pointer">Halal Hunt</div>
      <span className="text-center flex justify-center">

      <Divider className="w-4/5 bg-white "/>
      </span>

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
