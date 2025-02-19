"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/dashboard/Sidebar";
import React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const Home = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  };
  const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <div className="flex w-100 h-screen bg-gray-50">
          <SideBar />
          {children}
        </div>
      </>
    );
  };

  return <>{isDashboard ? <Dashboard children={children} /> : <Home children={children} />}</>;
}
