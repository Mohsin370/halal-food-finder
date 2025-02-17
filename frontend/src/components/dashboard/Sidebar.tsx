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
    <div className="sm:w-10 md:w-2/12 lg:w-[300px] bg-red-500 text-white">
      <div className="flex justify-center  content-center">
        <div className="h-screen w-full text-center p-5">
          {SideMenuList.map((item) => {
            return <SideMenuItem item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
