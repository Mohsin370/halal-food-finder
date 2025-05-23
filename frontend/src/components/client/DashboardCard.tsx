"use client";
import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";

type DashboardCardProps = {
  icon: string; // dynamic icon name, like "User", "ShoppingCart"
  title: string;
  count: number;
};

export default function DashboardCard({ icon, title, count }: DashboardCardProps) {
  return (
    <div className="w-full lg:w-1/4 h-48 pt-5 pl-7 bg-white rounded-xl">
      <div className="h-1/2">
        <DynamicIcon name={icon as any} strokeWidth={1} className="text-gray-700" size={48} />
      </div>

        <p className="text-sm text-default-500">{title}</p>
        <p className="text-4xl font-semibold mt-2">{count}</p>
    </div>
  );
}
