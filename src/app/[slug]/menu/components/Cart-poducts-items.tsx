"use client";

import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext, CartProduct } from "../context/cart";

interface CartProductItemsProps {
  cartProduct: CartProduct;
}

const CartProductItems = ({ cartProduct }: CartProductItemsProps) => {
  const { decreseProductQuantity, increaseProductQuantity, removeProducts } =
    useContext(CartContext);

  return (
    <div className="justify-between items-center flex space-y-2 gap-6">
      <div className=" flex gap-3 items-center text-start ">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover p-1 bg-zinc-200"
          />
        </div>
        <div className="space-y-1 ">
          <p className="truncate text-ellipsis text-sm">{cartProduct.name}</p>
          <p className="text-sm font-semibold">
            Preço: {formatCurrency(cartProduct.price)}
          </p>
          <div className="flex space-x-3 text-center items-center ">
            <button
              className="border border-zinc-300 p-0.5 !rounded-lg click cursor-pointer"
              onClick={() => decreseProductQuantity(cartProduct.id)}
            >
              <ChevronLeftIcon size={22} />
            </button>
            <p className="w-2 text-xs">{cartProduct.quantity}</p>
            <button
              className="border border-zinc-300 p-0.5 !rounded-lg click cursor-pointer   bg-red-600"
              onClick={() => increaseProductQuantity(cartProduct.id)}
            >
              <ChevronRightIcon className="text-white" size={22} />
            </button>
          </div>
        </div>
      </div>
      <button
        className="cursor-pointer border hover:text-white border-zinc-300 p-1.5 rounded-lg hover:border-red-500  hover:bg-red-500"
        onClick={() => removeProducts(cartProduct.id)}
      >
        <Trash2Icon className="w-4 h-4 " />
      </button>
    </div>
  );
};

export default CartProductItems;
