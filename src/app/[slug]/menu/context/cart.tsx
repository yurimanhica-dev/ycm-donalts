"use client";

import { Product } from "@prisma/client";
import { createContext, useMemo, useState } from "react";

// 2. Define the CartProduct type that extends the Product
export interface CartProduct
  extends Pick<Product, "id" | "name" | "imageUrl" | "price" | "restaurantId"> {
  quantity: number;
}

// 1. Create context
export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  subTotal: number;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProducts: (productId: string) => void;
  toggleDialog: () => void;
}

// 3. Create the CartContext and CartProvider components, and export them.
export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  toggleDialog: () => {},
  addProduct: () => {},
  subTotal: 0,
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProducts: () => {},
});

// 4. Create the CartProvider component to provide the CartContext and handle the cart functionality.
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotal = useMemo(() => {
    return products.reduce((total, product) => {
      return total + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    const hasDifferentRestaurant = products.some(
      (prevProduct) => prevProduct.restaurantId !== product.restaurantId
    );

    if(hasDifferentRestaurant){
      setProducts
    }

    const existingProduct = products.some(
      (prevProduct) => prevProduct.id === product.id
    );
    if (!existingProduct) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct; // Do not decrease quantity for the first product
        }
        return {
          ...prevProduct,
          quantity: prevProduct.quantity - 1,
        };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return {
          ...prevProduct,
          quantity: prevProduct.quantity + 1,
        };
      });
    });
  };

  const removeProducts = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        toggleDialog,
        addProduct,
        subTotal,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
