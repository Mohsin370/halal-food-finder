import { fetchRestaurantsListing } from "../../../utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function RestaurantDashboard() {
  const restaurants: RestaurantT[] = await fetchRestaurantsListing();

  return (
    <div className="container mx-auto p-10 max-w-full overflow-auto">
      <DataTable columns={columns} data={restaurants} />
    </div>
  );
}
