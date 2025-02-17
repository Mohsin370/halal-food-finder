"use client";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";

interface ISideMenuList {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  link: string;
}

const SideMenu = ({ item }: { item: ISideMenuList }) => {
  const router = useRouter();

  return (
    <Link onPress={() => router.push(item.link)} className="flex items-center font-semibold hover:bg-red-700 md:pl-2 py-3 rounded-sm mb-3 cursor-pointer text-white">
      <div className="pr-2">
        <item.icon className="h-5 w-5"></item.icon>
      </div>
      <div className="sm:hidden md:block">{item.name}</div>
    </Link>
  );
};

export default SideMenu;
