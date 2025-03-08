"use client";

import * as React from "react";
import { useEffect } from "react";
import { Button, Form, Input, Image } from "@heroui/react";
import AddressSearch from "../../../../components/client/AddressSearch";
import { Select, SelectItem } from "@heroui/select";
import { addRestaurant, getRestaurantlookUps, LookUpType } from "../../../../utils/api";
import { addToast } from "@heroui/react";

export default function RestaurantForm() {
  type RestaurantAddressType = {
    address: string;
    suburb: string;
    country: string;
    city: string;
    postcode: string;
    lat: string;
    lng: string;
    state: string;
  };

  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [address, setAddress] = React.useState<RestaurantAddressType>();
  const [restaurantType, setRestaurantType] = React.useState<Set<string>>(new Set([]));
  const [halalStatus, setHalalStatus] = React.useState<Set<string>>(new Set([]));
  const [cuisineType, setCuisineType] = React.useState<Set<string>>(new Set([]));
  const [restauntLookUps, setRestaurantLookUps] = React.useState<LookUpType>({
    restaurantType: [],
    cuisineType: [],
    halalStatus: [],
  });

  useEffect(() => {
    async function fetchLookups() {
      try {
        const lookupData = await getRestaurantlookUps();
        setRestaurantLookUps({ ...lookupData });
      } catch (error) {
        console.error("Unable to fetch lookup data.", error);
      }
    }
    fetchLookups();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("restaurantType", Array.from(restaurantType).join(","));
    const data = Object.fromEntries(formData);
    data.image = "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";

    const resp = await addRestaurant(data);
    if (resp.status == 201) {
      addToast({
        title: "Success",
        description: "Restaurant Added Successfully.",
        color: "success",
      });
    } else {
      addToast({
        title: "Something went wrong",
        description: "Please Try Again.",
        color: "danger",
      });
    }
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
        <Input
          className="lg:w-1/2 w-full m-auto"
          errorMessage="Please enter a valid name"
          label="Name"
          name="name"
          placeholder="Restaurant Name"
          type="text"
          isRequired
          minLength={5}
          value={name}
          onValueChange={setName}
          fullWidth={true}
        />
        <div className="m-auto w-full lg:w-1/2">
          <div className="my-3 flex">
            <Select isRequired className="" label="Restaurant Type" selectedKeys={restaurantType} onSelectionChange={(keys) => setRestaurantType(keys as Set<string>)}>
              {restauntLookUps.restaurantType.map((type) => (
                <SelectItem key={type.id}>{type.name}</SelectItem>
              ))}
            </Select>
            <div className="mx-3"></div>
            <Select isRequired className="" label="Halal Status" selectedKeys={halalStatus} onSelectionChange={(keys) => setHalalStatus(keys as Set<string>)}>
              {restauntLookUps.halalStatus.map((type) => (
                <SelectItem key={type.id}>{type.status}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="my-3 flex">
            <Select isRequired label="Cuisine Type" selectedKeys={cuisineType} onSelectionChange={(keys) => setCuisineType(keys as Set<string>)}>
              {restauntLookUps.cuisineType.map((type) => (
                <SelectItem key={type.id}>{type.name}</SelectItem>
              ))}
            </Select>
            <div className="mx-3"></div>
            <Input
              type="file"
              accept="image/*"
              onChange={(file) => {
                const imageFile = file.target.files?.[0];
                if (imageFile) {
                  const imageUrl = URL.createObjectURL(imageFile);
                  setImage(imageUrl);
                  return () => URL.revokeObjectURL(imageUrl); // Free memory
                }
              }}
              errorMessage="Cover photo required"
              label="Cover photo"
              name="image"
              fullWidth={true}
              isRequired
            />
          </div>
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
        <div className="m-auto w-full lg:w-1/2">
          <Input isRequired errorMessage="Please enter a valid address" label="Address" name="address" placeholder="Address" type="text" value={address?.address} fullWidth={true} isReadOnly={true} />
          <div className="my-3 flex">
            <Input isRequired errorMessage="Please enter a valid city" label="City" name="city" placeholder="City" type="text" value={address?.city} fullWidth={true} isReadOnly={true} />
            <div className="mx-3"></div>
            <Input isRequired errorMessage="Please enter a valid suburb" label="Suburb" name="suburb" placeholder="Suburb" type="text" value={address?.suburb} fullWidth={true} isReadOnly={true} />
          </div>
          <div className="my-3 flex">
            <Input isRequired errorMessage="Please enter a valid state" label="state" name="state" placeholder="State" type="text" value={address?.state} fullWidth={true} isReadOnly={true} />
            <div className="mx-3"></div>

            <Input
              isRequired
              errorMessage="Please enter a valid postcode"
              label="postcode"
              name="postcode"
              placeholder="Postcode"
              type="text"
              value={address?.postcode}
              fullWidth={true}
              isReadOnly={true}
            />
            <div className="mx-3"></div>

            <Input
              isRequired
              errorMessage="Please enter a valid country"
              className="max-w-fit"
              label="Country"
              name="country"
              placeholder="Country"
              type="text"
              value={address?.country}
              fullWidth={true}
              isReadOnly={true}
            />
          </div>
        </div>

        <Button type="submit" variant="bordered" className="m-auto my-10 ">
          Submit
        </Button>
      </Form>
    </div>
  );
}
