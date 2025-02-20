import { db } from "../../../lib/prisma";
import RestaurantItems from "./restaurant-items";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany();
  return (
    <div className="grid grid-cols-2 gap-4 w-96 h-50">
      {restaurants.map((restaurant) => (
        <RestaurantItems key={restaurant.id} restaurants={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
