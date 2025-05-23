import React, { JSX, ReactNode } from "react";

export default function ChartWrapper({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="bg-white rounded-xl p-5 w-full lg:w-[500px]">
      <div className="text-xl font-semibold">{title}</div>
      {children}
    </div>
  );
}
