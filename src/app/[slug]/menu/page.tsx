import { notFound } from "next/navigation";
import { db } from "../../../../lib/prisma";
import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumpionMethod = (consumptionMethod: string) => {
  return ["TAKEAWAY", "DINE_IN"].includes(consumptionMethod);
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });

  const { consumptionMethod } = await searchParams;

  if (!isConsumpionMethod(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      {restaurant && <RestaurantHeader restaurant={restaurant} />}
      {restaurant && <RestaurantCategories restaurant={restaurant} />}
    </div>
  );
};

export default RestaurantMenuPage;
