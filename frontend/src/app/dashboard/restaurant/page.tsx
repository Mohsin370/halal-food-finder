import { fetchRestaurants } from "../../../utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IRestaurants } from "@/interface/IRestaurants";

async function getData(): Promise<IRestaurants[]> {
  const restaurants: IRestaurants[] = await fetchRestaurants();
  return restaurants;
}

export default async function RestaurantDashboard() {
  const data = await getData();

  return (
    <div className="container mx-auto p-10 max-w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
