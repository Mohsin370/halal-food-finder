const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const uploadRestaurantImage = async (data: { image: string }) => {
  try {
    console.log(data)
    const response = await fetch(`${BASE_URL}/Restaurants/UploadImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: data.image }),
    });
    if (!response.ok) throw new Error("Failed to upload restaurant image!");
    return response.json();
  } catch (error) {
    console.log(error);
    return "";
  }
};
