"use client";

import { formatCurrency } from "@/helpers/format-currency";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon, Circle } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import CartSheet from "./Cart-sheet";
import DialogConfirmation from "./dialog-confirmation";

interface ProductDetailsProps {
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

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [showCart, setShowCart] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toggleCart, toggleDialog, addProduct, products } =
    useContext(CartContext);

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
    const hasDifferentRestaurant = products.some(
      (prevProduct) => prevProduct.restaurantId !== product.restaurantId
    );

    if (hasDifferentRestaurant) {
      setShowDialog(true); // Exibe apenas o Dialog
      setShowCart(false);
      toggleDialog();
    } else {
      addProduct({ ...product, quantity });
      toggleCart();
      setShowCart(true); // Exibe apenas o CartSheet
      setShowDialog(false);
    }
  };

  return (
    <>
      <div className="-mt-6 md:-mt-4 rounded-4xl bg-white p-5 z-50 relative w-full h-full flex flex-col flex-auto">
        <div className="flex-auto h-full">
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
          <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold text-red-500">
              Preço: {formatCurrency(product.price)}
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

          <div>
            <h3 className="font-semibold mt-6">Sobre</h3>
            <p className="mt-1 text-sm text-zinc-500">{product.description}</p>
            <div className="mt-4"></div>
            {product.ingredients?.length > 0 && (
              <>
                <h3 className="font-semibold mt-8 flex items-center gap-2 mb-2">
                  Ingredientes
                </h3>
                <ul>
                  {product.ingredients?.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="mt-1 text-zinc-500 text-sm flex items-center px-3"
                    >
                      <Circle className="size-1.5 text-zinc-500 fill-zinc-500 mr-2" />
                      {ingredient};
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <button
          className="click cursor-pointer bg-amber-500 !text-white w-full px-8 py-2 rounded-2xl h-[38px] "
          onClick={handleAddProductToCart}
        >
          Adicionar á Sacola
        </button>
      </div>
      {showCart && <CartSheet />}
      {showDialog && (
        <DialogConfirmation
          key={product.id}
          product={product}
          quantity={quantity}
        />
      )}
    </>
  );
};

export default ProductDetails;
