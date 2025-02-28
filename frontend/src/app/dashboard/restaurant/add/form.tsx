"use client";

import * as React from "react";
import { Button, Form, Input, Image } from "@heroui/react";
import AddressSearch from "../../../../components/client/AddressSearch";
import { Select, SelectSection, SelectItem } from "@heroui/select";

export default function RestaurantForm() {
  type RestaurantAddressType = {
    address: string;
    suburb: string;
    country: string;
    city: string;
    lat: string;
    lng: string;
    state: string;
  };
  const RestaunrType = [
    { key: "cat", label: "Fast Food" },
    { key: "dog", label: "Fine Dinning" },
    { key: "elephant", label: "Casual Dinning" },
    { key: "lion", label: "Food Truck" },
  ];

  const [name, setName] = React.useState<string>();
  const [image, setImage] = React.useState("");
  const [address, setAddress] = React.useState<RestaurantAddressType>();
  const [restaurantType, setRestaurantType] = React.useState<Set<string>>(new Set([]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("restaurantType", Array.from(restaurantType).join(","));
    const data = Object.fromEntries(formData);

    console.log(data);
  };

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <Image
          className="object-cover"
          alt="Restaurant Cover Photo"
          key={image}
          height={200}
          src={image ? image : "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png"}
          width={300}
        />
      </div>

      <Form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-10 w-full justify-center">
          <Input
            className="lg:w-1/3 w-full"
            errorMessage="Please enter a valid name"
            label="Name"
            name="name"
            placeholder="Restaurant Name"
            type="text"
            isRequired
            minLength={5}
            value={name}
            onValueChange={setName}
            fullWidth={false}
          />
          <Select isRequired className="xl:w-1/6 lg:w-1/4 w-full" label="Restaurant Type" selectedKeys={restaurantType} onSelectionChange={(keys) => setRestaurantType(keys as Set<string>)}>
            {RestaunrType.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>

          <Input
            type="file"
            accept="image/*"
            className="xl:w-1/6 lg:w-1/4 w-full"
            onChange={(file) => {
              console.log(file);
              const imageFile = file.target.files?.[0];
              if (imageFile) {
                const imageUrl = URL.createObjectURL(imageFile);
                setImage(imageUrl);
                console.log(imageUrl);
              }
            }}
            errorMessage="Cover photo required"
            label="Cover photo"
            name="image"
            fullWidth={false}
            isRequired
          />
        </div>
        {/* Address */}
        <div className="flex items-center my-6 w-full">
          <div className="flex-grow border-t border-gray-300 h-px"></div>
          <span className="px-3 text-gray-500 text-sm">Location</span>
          <div className="flex-grow border-t border-gray-300 h-px"></div>
        </div>

        <div className="flex flex-wrap gap-5 mb-10 m-auto">
          <AddressSearch setAddress={setAddress} />
        </div>
        <div className="flex gap-5 flex-wrap justify-center ">
          <Input isRequired errorMessage="Please enter a valid address" label="Address" name="address" placeholder="Address" type="text" value={address?.address} fullWidth={false} isReadOnly={true} />
          <Input isRequired errorMessage="Please enter a valid city" label="City" name="city" placeholder="City" type="text" value={address?.city} fullWidth={false} isReadOnly={true} />
          <Input isRequired errorMessage="Please enter a valid suburb" label="Suburb" name="suburb" placeholder="Suburb" type="text" value={address?.suburb} fullWidth={false} isReadOnly={true} />
          <Input
            isRequired
            errorMessage="Please enter a valid country"
            className="max-w-fit"
            label="Country"
            name="country"
            placeholder="Country"
            type="text"
            value={address?.country}
            fullWidth={false}
            isReadOnly={true}
          />
        </div>

        <Button type="submit" variant="bordered" className="m-auto mt-10 ">
          Submit
        </Button>
      </Form>
    </div>
  );
}
