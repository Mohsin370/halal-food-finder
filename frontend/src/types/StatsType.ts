type StatsType = {
    restaurantCount: number,
    statsByCuisine : CategoryStatsType[]
    statsByStatus : CategoryStatsType[]
    statsbyType : CategoryStatsType[]
}

type CategoryStatsType = {
    name: string,
    count: number
}