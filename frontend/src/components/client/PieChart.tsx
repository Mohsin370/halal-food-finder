"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChart({ stats }: { stats: CategoryStatsType[] }) {
  const series = stats.map((item) => item.count);
  const labels = stats.map((item) => item.name);

  const options: ApexOptions = {
    labels,
    legend: {
        show: false
    },
  };
  return <ReactApexChart type="donut" series={series} options={options} />;
}
