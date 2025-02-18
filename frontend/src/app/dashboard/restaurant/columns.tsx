"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { IRestaurants } from "@/interface/IRestaurants";

let toggleState = false;
export const columns: ColumnDef<IRestaurants>[] = [
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="light"
          onPress={() => {
            column.toggleSorting((toggleState = !toggleState));
          }}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "suburb",
    header: "Suburb",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
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
            <DropdownItem key="abcd">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];
