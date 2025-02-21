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

const CartSheet = () => {
  const { isOpen, toggleCart, products, subTotal } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-fit">
        <SheetHeader>
          <SheetTitle className="text-start mb-6 font-semibold">
            Sacola
          </SheetTitle>
        </SheetHeader>
        <div className="flex-auto">
          {products.map((product) => (
            <CartProductItems key={product.id} cartProduct={product} />
          ))}
        </div>

        <Card className="">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">Subtotal:</span>
                <span className="text-sm">
                  {formatCurrency(subTotal / 1.11111)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">IVA:</span>
                <span className="text-sm ">
                  {formatCurrency(subTotal * 0.1)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm font-semibold ">Total</span>
                <span className="text-sm font-semibold ">
                  {formatCurrency(subTotal * 1.1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <button className="mt-4 w-full !bg-amber-500 !text-white !border-none px-4 py-2 button click">
          Finalizar pedido
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
