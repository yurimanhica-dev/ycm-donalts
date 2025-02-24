"use client";
import { Prisma } from "@prisma/client";
import { Clock, StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true;
  };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const getStatus = () => {
    const horaAtual = new Date().getHours();
    return horaAtual >= 7 && horaAtual < 15;
  };

  const restaurantTimeOpen = getStatus();

  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return selectedCategory.id === category.id
      ? "bg-amber-500"
      : "text-zinc-300 border-zinc-300 border";
  };
  return (
    <>
      <div className="flex flex-col items-center bg-white -mt-10 rounded-t-3xl z-50 absolute w-full border-b shadow-sm border-zinc-200">
        <div className="p-5">
          <div className="flex gap-4 items-center">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={45}
              height={45}
            />
            <div>
              <h2 className="font-semibold text-xl">{restaurant.name}</h2>
              <p className="text-gray-500 text-sm">{restaurant.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs border border-zinc-300 rounded-full px-2 py-1 ml-4">
              <StarIcon className="w-4 h-4 text-amber-500 fill-amber-500" />
              5.0
            </div>
          </div>
          <div className="flex gap-1 justify-start items-center mt-4 text-xs bg-white">
            <Clock
              size={18}
              className={restaurantTimeOpen ? "text-green-500" : "text-red-500"}
            />
            <h2
              className={restaurantTimeOpen ? "text-green-500" : "text-red-500"}
            >
              {restaurantTimeOpen ? "Aberto" : "Fechado"}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-30 px-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden sm:justify-center">
        {restaurant.menuCategories.map((category) => (
          <button
            onClick={() => handleCategoryClick(category)}
            className={`px-5 py-1 rounded-full click text-white  ${getCategoryButtonVariant(
              category
            )}`}
            key={category.id}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className=" mt-8">
        <h3 className="px-4 text-lg font-semibold mb-2">
          {selectedCategory.name}
        </h3>
        <Products products={selectedCategory.products} />
      </div>
    </>
  );
};

export default RestaurantCategories;
