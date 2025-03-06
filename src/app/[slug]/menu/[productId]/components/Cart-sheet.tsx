import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";
import { useContext } from "react";
import CartProductItems from "../../components/Cart-poducts-items";
import { CartContext } from "../../context/cart";
import FinishedOrderButton from "./finished-order-button";

const CartSheet = () => {
  const { isOpen, toggleCart, products, subTotal, iva } =
    useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[85vw]">
        <SheetHeader>
          <SheetTitle className="text-start font-semibold ">Sacola</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          <div className="flex flex-col  h-full mt-4">
            <div className="flex-auto">
              {products.map((product) => (
                <CartProductItems key={product.id} cartProduct={product} />
              ))}
            </div>

            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">Subtotal:</span>
                    <span className="text-sm">{formatCurrency(subTotal)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">IVA:</span>
                    <span className="text-sm ">{formatCurrency(iva)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold ">Total</span>
                    <span className="text-sm font-semibold ">
                      {formatCurrency(subTotal + iva)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <FinishedOrderButton />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <span className="text-sm text-gray-500">
              Sua sacola está vazia.
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
