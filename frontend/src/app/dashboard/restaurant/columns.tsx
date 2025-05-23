"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { deleteRestaurantById } from "../../../utils/api";

let toggleState = false;
export const columns: ColumnDef<Restaurant>[] = [
  {
    accessorKey: "image",
    header:"",
    cell: ({ row }) => {
      return (
        <div className="">
          <img src={row.original.image} className="h-10 w-10" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cuisineType.name",
    header: "Cuisine",
  },  {
    accessorKey: "restaurantType.name",
    header: "Restaurant Type",
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <div
        className="flex"
          onClick={() => {
            column.toggleSorting((toggleState = !toggleState));
          }}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "suburb",
    header: "Suburb",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const element = row.original;
  
      return (
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="light" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Link Actions">
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete" color="danger" onPress={() => deleteHandler(element)} > Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];
const deleteHandler = async ( element: Restaurant) => {
  await deleteRestaurantById(element.id);
}
