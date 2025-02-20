"use client";

import { Product } from "@prisma/client";
import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}
const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="button click hover:bg-red-500 rounded-full w-10 h-10 absolute top-4 left-4 flex items-center justify-center"
        >
          <ChevronLeft />
        </button>
        <button className="button click hover:bg-red-500 rounded-full w-10 h-10 absolute top-4 right-4 flex items-center justify-center">
          <ScrollTextIcon />
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;
