import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Product } from "@prisma/client";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import CartSheet from "./Cart-sheet";

interface DialogConfirmationProps {
  product: Product;
  quantity: number;
}

const DialogConfirmation = ({ product, quantity }: DialogConfirmationProps) => {
  const { isOpen, addProduct } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const addProductToCart = () => {
    addProduct({ ...product, quantity });
    //toggleDialog();
    setShowCart(true);
  };

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-6xl">⚠️</span>
              <p className="mt-2">
                Você só pode adicionar itens de um Restaurant por vez!
              </p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto ao seu carrinho? Isso limpara
              sua sacola atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={addProductToCart}
              className="bg-amber-500 hover:bg-amber-400 cursor-pointer"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {showCart && <CartSheet />}
    </>
  );
};

export default DialogConfirmation;
