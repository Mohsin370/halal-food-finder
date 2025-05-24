"use client";

import * as React from "react";
import { useEffect } from "react";
import { Button, Form, Input, Image, Textarea } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { addRestaurant, fetchRestaurantById, getRestaurantlookUps, LookUpType, uploadRestaurantImage } from "../../../../utils/api";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import GoogleAutoComplete from "../../../../components/client/GoogleAutoComplete";

export default function RestaurantForm(props: { action: "add" | "edit" }) {
  const router = useRouter();
  const [originalImage, setOriginalImage] = React.useState<string>("");
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
    reviews: [] as Review[],
  });

  const [restaurantLookUps, setRestaurantLookUps] = React.useState<LookUpType>({
    restaurantType: [],
    cuisineType: [],
    halalStatus: [],
  });

  const fetchRestaurantDetails = async () => {
    const id = window.location.pathname.split("/").pop();
    const restaurantDetails: any = await fetchRestaurantById(Number(id));
    setFormState((prev) => ({
      ...prev,
      placeId: restaurantDetails.placeId,
      rating: restaurantDetails.rating,
      userRatingCount: restaurantDetails.userRatingCount,
      name: restaurantDetails.name,
      description: restaurantDetails.description,
      image: restaurantDetails.image,
      restaurantType: new Set([restaurantDetails.restaurantType.id.toString()]),
      halalStatus: new Set([restaurantDetails.halalStatus.id.toString()]),
      cuisineType: new Set([restaurantDetails.cuisineType.id.toString()]),
      isFeatured: new Set([restaurantDetails.isFeatured ? "true" : "false"]),
      address: {
        address: restaurantDetails.address,
        city: restaurantDetails.city,
        suburb: restaurantDetails.suburb,
        state: restaurantDetails.state,
        postCode: restaurantDetails.postCode,
        country: restaurantDetails.country,
        lat: restaurantDetails.lat,
        lng: restaurantDetails.lng,
      },
      reviews: restaurantDetails.reviews || [],
    }));
    setOriginalImage(restaurantDetails.image); // Store the original image URL for comparison
  };

  useEffect(() => {
    if (props.action === "edit") {
      fetchRestaurantDetails();
    }
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
console.log("Form State:", originalImage);
    if(originalImage !== formState.image) {
    try {
      formState.image = await uploadRestaurantImage({ image: formState.image }).then((res) => res.secure_url);
    } catch {
      addToast({ title: "Error uploading image file", description: "Please Try Again.", color: "danger", timeout: 3000 });
      return;
    }
    if (!formState.image) {
      addToast({ title: "Error uploading image file", description: "Please Try Again.", color: "danger", timeout: 3000 });
      return;
    }
  }

    const payload = {
      restaurantTypeId: Array.from(formState.restaurantType)[0],
      halalStatusId: Array.from(formState.halalStatus)[0],
      cuisineTypeId: Array.from(formState.cuisineType)[0],
      isFeatured: Array.from(formState.isFeatured)[0] === "true",
      lat: formState.address?.lat || "",
      lng: formState.address?.lng || "",
      image:formState.image,
      placeId: formState.placeId,
      rating: formState.rating,
      userRatingCount: formState.userRatingCount,
      Address: formState.address.address,
      city: formState.address.city,
      suburb: formState.address.suburb,
      name: formState.name,
      country: formState.address.country,
      description: formState.description,
      state: formState.address.state,
      postcode: formState.address.postCode,
      reviews: formState.reviews, // already an array of objects
    };
    const resp = await addRestaurant(payload);
    if (resp.status == 201) {
      addToast({ title: "Success", description: "Restaurant Added Successfully.", color: "success", timeout: 3000 });
      router.push("/dashboard/restaurant");
    } else if (resp.status === 409) {
      addToast({ title: "This restaurant may already exist.", description: "Please Try Another business.", color: "danger", timeout: 3000 });
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
              if (!imageFile) {
                // 🟡 No new file selected, keep existing image
                return;
              }
              if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = () => handleChange("image", reader.result as string);
                reader.readAsDataURL(imageFile);
              }
            }}
            label="Cover photo"
            name="image"
            isRequired={props.action === "add"}
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
            setPlaceDetails={
              (placeDetail) =>
                setFormState((prev) => ({
                  ...prev,
                  address: placeDetail.address,
                  placeId: placeDetail.placeId,
                  rating: placeDetail.rating,
                  userRatingCount: placeDetail.userRatingCount,
                  reviews: placeDetail.reviews,
                }))
              // setLocationReviews(()=>{...prev})
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
              label="State"
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
              label="Post Code"
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
