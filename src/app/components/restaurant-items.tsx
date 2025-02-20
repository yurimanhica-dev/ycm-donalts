import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface RestaurantItemsProps {
  restaurants: Restaurant;
}

const RestaurantItems = ({ restaurants }: RestaurantItemsProps) => {
  return (
    <div>
      <div className="text-sm border border-zinc-300 rounded-3xl text-center p-4 h-full">
        <div>
          <Image
            src={restaurants.avatarImageUrl}
            alt={restaurants.name}
            height={82}
            width={82}
            className="mx-auto mt-2"
          />
          <h1 className="mt-1 text-lg font-semibold">{restaurants.name}</h1>
        </div>
        <p className=" text-gray-500">{restaurants.description} 📍</p>

        <div className="mt-3 text-sm w-full px-4 py-1 button click">
          <Link className="" href={`/${restaurants.slug}`}>
            Começar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItems;
