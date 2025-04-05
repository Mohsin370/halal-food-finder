const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const autoComplete = async (input: string, signal?: AbortSignal) => {
  try {
    const response = await fetch(`${BASE_URL}/GooglePlaces/autoComplete?input=${input}`, { signal });
    if (!response.ok) throw new Error(`Failed to fetch suggestions`);
    return response.json();
  } catch (Ex) {
    console.log("Server not connected");
  }
};

export const placeDetails = async (placeId: string, params: string[]) => {
  try {
    const response = await fetch(`${BASE_URL}/GooglePlaces/placeDetails?placeId=${placeId}`, {
      method: "GET",
      headers: {
        "X-Goog-FieldMask": params.join(","),
      },
    });
    if (!response.ok) throw new Error(`Failed to fetch lookup data`);
    return response.json();
  } catch (Ex) {
    console.log("Server not connected");
  }
};
