//   const options: ApexOptions = {
//     colors: ["#465fff"],
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       type: "bar",
//       height: 180,
//       toolbar: {
//         show: false,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "39%",
//         borderRadius: 5,
//         borderRadiusApplication: "end",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 4,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "left",
//       fontFamily: "Outfit",
//     },
//     yaxis: {
//       title: {
//         text: undefined,
//       },
//     },
//     grid: {
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//     },
//     fill: {
//       opacity: 1,
//     },

import { stat } from "fs";
import PieChart from "../../components/client/PieChart";
import { getDashboardStats } from "../../utils/api";

//     tooltip: {
//       x: {
//         show: false,
//       },
//       y: {
//         formatter: (val: number) => `${val}`,
//       },
//     },
//   };
//   const series = [
//     {
//       name: "Sales",
//       data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
//     },
//   ];

import DashboardCard from "../../components/client/DashboardCard";
import ChartWrapper from "../../components/client/ChartWrapper";

const Dashboard = async () => {
  const stats: StatsType = await getDashboardStats();
  return (
    <div className="container  max-w-full overflow-auto bg-gray-100">
      <div className=" m-4 ">
        <DashboardCard icon="store" title="Restaurants" count={stats.restaurantCount} />{" "}
      </div>
      <div className="w-full flex mt-5 flex-wrap [&>div]:m-5">
        <ChartWrapper title="Cuisines">
          <PieChart stats={stats.statsByCuisine} />
        </ChartWrapper>
        <ChartWrapper title="Halal Status">
          <PieChart stats={stats.statsByStatus} />
        </ChartWrapper>
        <ChartWrapper title="Restaurant Type">
          <PieChart stats={stats.statsbyType} />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default Dashboard;
