const MAPBOX_URL = process.env.NEXT_PUBLIC_MAPBOX_URL+"/search";
const VERSION = "v1";
const ACCESS_TOKEN= process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const autoCompleteAddress = async (search_text: string, type?: string ) => {
  
  try{

    if(!ACCESS_TOKEN){
      throw new Error("ACCESS TOKEN is missing");
    }

    const params = new URLSearchParams({
      q: search_text,
      limit: '4',
      access_token: ACCESS_TOKEN,
    });

    if(type){
      params.append("types", type);
    }

    const response = await fetch(`${MAPBOX_URL}/searchbox/${VERSION}/forward?${params}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch locations");
    return response.json();
  
  }catch(error){
    console.log(error);
    return [];
  }
};
