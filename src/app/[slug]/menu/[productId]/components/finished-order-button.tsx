"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { formatCurrency } from "@/helpers/format-currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CartContext } from "../../context/cart";

const formSchema = z.object({
  username: z.string().trim().min(1, {
    message: "O nome de usuário é obrigatório",
  }),
  email: z.string().trim().email({ message: "E-mail inválido" }),
  number: z.string().trim().min(1, { message: "O telefone é obrigatório" }),
});

type FormData = z.infer<typeof formSchema>;
const FinishedOrderButton = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      number: "",
    },
    shouldUnregister: true,
  });
  const handleSubmitCancelButton = () => {
    form.reset();
  };
  const onSubmit = (data: FormData) => console.log(data);

  const { subTotal } = useContext(CartContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full !bg-amber-500 !text-white !border-none px-4 py-2 button mb-10 click ">
          Finalizar pedido
        </button>
      </DialogTrigger>
      <DialogContent className="flex justify-center w-full ">
        <DialogHeader>
          <DialogTitle className="text-center">Quase là!</DialogTitle>
          <DialogDescription className="text-center">
            Nota: no nosso sistema so aceitamos pagamentos com o Eco-Sistema{" "}
            <span className="text-red-500 text-md">M-pesa </span> insira os
            dados solicitados para prosseguir
          </DialogDescription>
          <div className="pt-4 flex justify-center w-fill">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do usuário</FormLabel>
                      <FormControl>
                        <Input
                          className="focus:outline-none !border-zinc-400 rounded-4xl"
                          placeholder="Digite seu nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          className="focus:outline-none !border-zinc-400 rounded-4xl"
                          placeholder="Digite seu E-mail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          className="focus:outline-none !border-zinc-400 rounded-4xl"
                          placeholder="Digite seu número"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-start text-zinc-600 text-xs">
                  *O pagamento do Iva recai sob nossa responsabilidade
                  <br />
                  <br />
                  <p>
                    Total a Pagar:{" "}
                    <span className="text-red-500">
                      {formatCurrency(subTotal)}
                    </span>
                  </p>
                </p>

                <div className="flex gap-4 justify-center pt-4">
                  <button
                    className="rounded-full text-sm px-8 py-2 click bg-zinc-100 font-semibold hover:bg-zinc-200"
                    type="submit"
                    onClick={handleSubmitCancelButton}
                  >
                    Cancelar
                  </button>
                  <button
                    className="rounded-full text-sm px-8 py-2 click text-white bg-red-600 font-semibold hover:bg-red-500"
                    type="submit"
                  >
                    Finalizar
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FinishedOrderButton;
