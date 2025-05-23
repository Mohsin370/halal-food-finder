const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Dashboard/stats`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  } catch (error) {
    console.log(error);
    return "";
  }
};
