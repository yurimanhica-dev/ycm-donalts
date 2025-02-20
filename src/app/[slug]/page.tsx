import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "../../../lib/prisma";
import ConsumpionMethod from "./components/consumption-method";

interface RestaurantPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findFirst({
    where: { slug },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex flex-col justify-center h-screen relative">
      <div className="flex flex-col items-center">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={100}
          height={100}
          className="animate-blur-in hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer -mt-30"
        />
        <h2 className="mt-3 font-bold text-3xl text-red-600 italic">
          {restaurant?.name}
        </h2>
        <div className="mt-20 text-center px-8 space-y-2">
          <h1 className="text-2xl font-semibold text-amber-500">
            Seja bem-vindo!!
          </h1>
          <span className="text-gray-500 text-sm">
            Escolha como prefere aproveitar sua refeição. <br />
            Estamos aqui para oferecer praticidade e sabor em cada detalhe!
          </span>
        </div>
        <div className="grid grid-cols-2 mt-12 h-[190px] w-[360px] gap-8">
          <ConsumpionMethod
            slug={slug}
            option="DINE_IN"
            buttonText="Para comer aqui"
            imageAlt="Comer aqui"
            imageUrl="/hamburger.png"
          />
          <ConsumpionMethod
            slug={slug}
            option="TAKEAWAY"
            buttonText="Para levar"
            imageAlt="Para levar"
            imageUrl="/sacola.png"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 bg-zinc-300 p-4 text-zinc-600 w-full text-center">
        {restaurant.description} 📍
      </div>
    </div>
  );
};

export default RestaurantPage;
