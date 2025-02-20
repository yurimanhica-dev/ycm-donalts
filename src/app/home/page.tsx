import Image from "next/image";
import ProductBadge from "../components/productbadge";

export default async function Home() {
  return (
    <div className="flex justify-center mt-[75px]">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Vercel Logo"
          width={130}
          height={100}
          className="animate-blur-in hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer"
        />
        <h1 className="mt-3 font-semibold text-xl">YCM Donald&apos;s</h1>

        <div className="mt-20 text-center px-8 space-y-2">
          <h1 className="text-2xl font-semibold">Seja bem-vindo!</h1>
          <span className="text-gray-500 text-sm">
            Escolha como prefere aproveitar sua refeição. <br />
            Estamos aqui para oferecer praticidade e sabor em cada detalhe!
          </span>
        </div>
        <div className="grid grid-cols-2 mt-12 h-[190px] w-[360px] gap-8">
          <ProductBadge />
        </div>
      </div>
    </div>
  );
}
