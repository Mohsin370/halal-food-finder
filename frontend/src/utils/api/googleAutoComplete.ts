const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const autoComplete = async (input: string) => {
  try {
    const response = await fetch(`${BASE_URL}/GooglePlaces/autoComplete?input=${input}`);
    if (!response.ok) throw new Error(`Failed to fetch lookup data`);
    return response.json();
  } catch (Ex) {
    console.log("Server not connected");
  }
};
