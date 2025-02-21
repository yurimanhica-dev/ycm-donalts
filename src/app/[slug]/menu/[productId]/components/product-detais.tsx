"use client";

import { ScrollArea } from "@/app/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon, Circle, Soup } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import CartSheet from "./Cart-sheet";

interface ProductDetaisProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true;
          name: true;
        };
      };
    };
  }>;
}

const ProductDetais = ({ product }: ProductDetaisProps) => {
  const { toggleCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleAddProductToCart = () => {
    toggleCart();
  };
  return (
    <>
      <div className="-mt-6 rounded-4xl bg-white p-5 z-50 relative w-full h-full flex flex-col flex-auto overflow-hidden">
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-2">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              height={26}
              width={26}
              className="rounded-full click cursor-pointer"
            />
            <p className="text-gray-500 text-sm">{product.restaurant.name}</p>
          </div>
          <h2 className="text-2xl font-semibold mt-2">{product.name}</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </p>
            <div className="flex space-x-3 text-center items-center ">
              <button
                className="border border-zinc-300 rounded-2xl click cursor-pointer p-2"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon />
              </button>
              <p className="w-3">{quantity}</p>
              <button
                className="border border-zinc-300 rounded-2xl click cursor-pointer p-2  bg-red-600"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon className="text-white" />
              </button>
            </div>
          </div>
          <ScrollArea className="h-full mt-5">
            <div>
              <h3 className="font-semibold text-lg">Sobre</h3>
              <p className="mt-1 text-zinc-500">{product.description}</p>
              <div className="mt-6"></div>
              {product.ingredients?.length > 0 && (
                <>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <Soup />
                    Ingredientes
                  </h3>
                  <ul>
                    {product.ingredients?.map((ingredient) => (
                      <li
                        key={ingredient}
                        className="mt-1 text-zinc-500 flex items-center px-3"
                      >
                        <Circle className="size-1.5 text-zinc-500 fill-zinc-500 mr-2" />
                        {ingredient};
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
        <button
          className="mt-6 button bg-amber-500 !text-white click w-full px-8 py-2"
          onClick={handleAddProductToCart}
        >
          Adicionar á Sacola
        </button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetais;
