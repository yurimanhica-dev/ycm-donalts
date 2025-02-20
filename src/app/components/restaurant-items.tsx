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
        </div>
        <p className=" text-gray-500 mt-3">{restaurants.description}.</p>
        <div className="mt-3 text-sm w-full px-4 py-1 button hover:bg-red-500 click">
          <Link className="" href={`/${restaurants.slug}`}>
            Começar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItems;
