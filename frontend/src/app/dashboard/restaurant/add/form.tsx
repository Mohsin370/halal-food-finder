"use client";

import * as React from "react";
import { useEffect } from "react";
import { Button, Form, Input, Image, Textarea } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { addRestaurant, getRestaurantlookUps, LookUpType } from "../../../../utils/api";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import GoogleAutoComplete from "../../../../components/client/GoogleAutoComplete";

export default function RestaurantForm() {
  const router = useRouter();

  const isFeaturedOptions = [
    { key: "true", name: "Yes" },
    { key: "false", name: "No" },
  ];

  // **Single Form State**
  const [formState, setFormState] = React.useState({
    placeId: "",
    rating: "",
    userRatingCount: "",
    name: "",
    description: "",
    image: "",
    restaurantType: new Set<string>(),
    halalStatus: new Set<string>(),
    cuisineType: new Set<string>(),
    isFeatured: new Set<string>(["false"]),
    address: {} as RestaurantAddressType,
  });

  const [restaurantLookUps, setRestaurantLookUps] = React.useState<LookUpType>({
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

  const handleChange = (key: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("restaurantTypeId", Array.from(formState.restaurantType).join(","));
    formData.append("halalStatusId", Array.from(formState.halalStatus).join(","));
    formData.append("cuisineTypeId", Array.from(formState.cuisineType).join(","));
    formData.append("lat", formState.address?.lat || "");
    formData.append("lng", formState.address?.lng || "");
    formData.append("image", formState.image);
    formData.append("isFeatured", Array.from(formState.isFeatured).join(","));
    formData.append("placeId", formState.placeId);
    formData.append("rating", formState.rating);
    formData.append("userRatingCount", formState.userRatingCount);

    const data = Object.fromEntries(formData);

    const resp = await addRestaurant(data);
    if (resp.status == 201) {
      addToast({ title: "Success", description: "Restaurant Added Successfully.", color: "success", timeout: 3000 });
      router.push("/dashboard/restaurant");
    } else {
      addToast({ title: "Something went wrong", description: "Please Try Again.", color: "danger", timeout: 3000 });
    }
  };

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <Image
          className="object-cover"
          alt="Restaurant Cover Photo"
          key={formState.image}
          height={200}
          src={formState.image || "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png"}
          width={300}
        />
      </div>

      <Form className="w-full" onSubmit={onSubmit}>
        <Input
          className="lg:w-1/2 w-full m-auto"
          label="Name"
          name="name"
          placeholder="Restaurant Name"
          isRequired
          minLength={5}
          value={formState.name}
          onValueChange={(val) => handleChange("name", val)}
          fullWidth
        />
        <Textarea
          className="lg:w-1/2 w-full m-auto"
          label="Description"
          name="description"
          placeholder="Say some nice things"
          isRequired
          minLength={5}
          value={formState.description}
          onValueChange={(val) => handleChange("description", val)}
          fullWidth
        />
        <div className="m-auto w-full lg:w-1/2">
          <div className="my-3 flex">
            <Select isRequired label="Restaurant Type" selectedKeys={formState.restaurantType} onSelectionChange={(keys) => handleChange("restaurantType", keys)}>
              {restaurantLookUps.restaurantType.map((type) => (
                <SelectItem key={type.id}>{type.name}</SelectItem>
              ))}
            </Select>
            <div className="mx-3"></div>
            <Select isRequired label="Halal Status" selectedKeys={formState.halalStatus} onSelectionChange={(keys) => handleChange("halalStatus", keys)}>
              {restaurantLookUps.halalStatus.map((type) => (
                <SelectItem key={type.id}>{type.status}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="my-3 flex">
            <Select isRequired label="Cuisine Type" selectedKeys={formState.cuisineType} onSelectionChange={(keys) => handleChange("cuisineType", keys)}>
              {restaurantLookUps.cuisineType.map((type) => (
                <SelectItem key={type.id}>{type.name}</SelectItem>
              ))}
            </Select>
            <div className="mx-3"></div>
            <Select isRequired label="Featured" selectedKeys={formState.isFeatured} onSelectionChange={(keys) => handleChange("isFeatured", keys)}>
              {isFeaturedOptions.map((item) => (
                <SelectItem key={item.key}>{item.name}</SelectItem>
              ))}
            </Select>
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={(file) => {
              const imageFile = file.target.files?.[0];
              if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = () => handleChange("image", reader.result as string);
                reader.readAsDataURL(imageFile);
              }
            }}
            label="Cover photo"
            name="image"
            isRequired
            fullWidth
          />
        </div>

        {/* Address */}
        <div className="flex items-center my-6 w-full">
          <div className="flex-grow border-t border-gray-300 h-px"></div>
          <span className="px-3 text-gray-500 text-sm">Location</span>
          <div className="flex-grow border-t border-gray-300 h-px"></div>
        </div>

        <div className="flex flex-wrap gap-5 mb-10 m-auto w-full lg:w-1/2">
          {/* Not using mapbox autocomplete, moving to google apis */}
          <GoogleAutoComplete
            setPlaceDetails={(placeDetail) =>
              setFormState((prev) => ({ ...prev, address: placeDetail.address, placeId: placeDetail.placeId, rating: placeDetail.rating, userRatingCount: placeDetail.userRatingCount }))
            }
          />
        </div>
        <div className="m-auto w-full lg:w-1/2">
          <Input
            isRequired
            errorMessage="Please enter a valid address"
            label="Address"
            name="address"
            placeholder="Address"
            type="text"
            value={formState.address?.address}
            fullWidth={true}
            isReadOnly={true}
          />
          <div className="my-3 flex">
            <Input isRequired errorMessage="Please enter a valid city" label="City" name="city" placeholder="City" type="text" value={formState.address?.city} fullWidth={true} isReadOnly={true} />
            <div className="mx-3"></div>
            <Input
              isRequired
              errorMessage="Please enter a valid suburb"
              label="Suburb"
              name="suburb"
              placeholder="Suburb"
              type="text"
              value={formState.address?.suburb}
              fullWidth={true}
              isReadOnly={true}
            />
          </div>
          <div className="my-3 flex">
            <Input
              isRequired
              errorMessage="Please enter a valid state"
              label="state"
              name="state"
              placeholder="State"
              type="text"
              value={formState.address?.state}
              fullWidth={true}
              isReadOnly={true}
            />
            <div className="mx-3"></div>

            <Input
              isRequired
              errorMessage="Please enter a valid postcode"
              label="postCode"
              name="postCode"
              placeholder="Postcode"
              type="text"
              value={formState.address?.postCode}
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
              value={formState.address?.country}
              fullWidth={true}
              isReadOnly={true}
            />
          </div>
        </div>

        <Button type="submit" variant="bordered" className="m-auto my-10">
          Submit
        </Button>
      </Form>
    </div>
  );
}
