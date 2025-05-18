"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Input } from "@heroui/react";
import { Logo } from "../images/logo";
import { useRouter, usePathname } from "next/navigation";
import LocationInput from "./client/LocationInput";
import CurrentLocation from "./client/CurrentLocation";

export default function App() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Restaurants", link: "/restaurants" },
    { name: "Map View", link: "/mapView" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
      {/* Logo */}
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
            <Logo />
            <p className="font-bold text-inherit">HalalFindr</p>
          </div>
        </NavbarBrand>
      </NavbarContent>
      {/* Location Section */}
      {pathname !== "/" && (
        <NavbarContent className="hidden sm:flex gap-3" justify="center">
          <NavbarMenuItem>
            <LocationInput />
          </NavbarMenuItem>
          <NavbarMenuItem>
            <CurrentLocation />
          </NavbarMenuItem>
        </NavbarContent>
      )}
      {/* Menu Options */}
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" className="cursor-pointer" onPress={() => router.push("/restaurants")}>
            Restaurants
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="cursor-pointer" onPress={() => router.push("/mapView")}>
            Map View
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Options */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      {pathname !== "/" && (
        <NavbarContent className="sm:hidden" justify="center">
          <NavbarMenuItem>
            <LocationInput />
          </NavbarMenuItem>
          <NavbarMenuItem>
            <CurrentLocation />
          </NavbarMenuItem>
        </NavbarContent>
      )}

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
          <p className="font-bold text-inherit">HalalFindr</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.link} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
