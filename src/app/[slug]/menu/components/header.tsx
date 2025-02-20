"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
        quality={100}
      />
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="hover:scale-105 duration-500 ease-in-out cursor-pointer hover:bg-red-500 hover:text-white bg-white rounded-full w-10 h-10 absolute top-4 left-4 flex items-center justify-center"
        >
          <ChevronLeft />
        </button>
        <button className="hover:scale-105 duration-500 ease-in-out cursor-pointer hover:bg-zinc-100 bg-white rounded-full w-10 h-10 absolute top-4 right-4 flex items-center justify-center">
          <Image
            src="/pdf.png"
            alt="pdf print"
            height={20}
            width={20}
            quality={100}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default RestaurantHeader;
