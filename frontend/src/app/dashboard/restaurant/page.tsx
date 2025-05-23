import { fetchRestaurantsListing } from "../../../utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function RestaurantDashboard() {
  const restaurants: Restaurant[] = await fetchRestaurantsListing();

  return (
    <div className="container p-10 max-w-full overflow-auto">
      <DataTable columns={columns} data={restaurants} />
    </div>
  );
}
