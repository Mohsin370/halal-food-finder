import { fetchRestaurants } from "../../../utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IRestaurants } from "@/interface/IRestaurants";

export default async function RestaurantDashboard() {
  const restaurants: IRestaurants[] = await fetchRestaurants();


  return (
    <div className="container mx-auto p-10 max-w-full overflow-auto">
      <DataTable columns={columns} data={restaurants} />
    </div>
  );
}
