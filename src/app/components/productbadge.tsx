import Image from "next/image";
import Link from "next/link";

const ProductBadge = async () => {
  return (
    <>
      <div className="border border-gray-300 rounded-2xl w-full h-full">
        <div className="flex flex-col items-center justify-center mt-8 px-4 text-center">
          <Image
            src="/hamburger.png"
            alt="Vercel Logo"
            width={75}
            height={80}
          />
          <Link
            className="text-xs py-1.5 bg-zinc-200 rounded-full font-semibold mt-8 hover:bg-red-500 hover:text-white cursor-pointer w-full"
            href={`/restaurants/`}
          >
            Para comer aqui
          </Link>
        </div>
      </div>
      <div className="border border-gray-300 rounded-2xl w-full h-full">
        <div className="flex flex-col items-center justify-center mt-8 px-4 text-center">
          <Image src="/sacola.png" alt="Vercel Logo" width={75} height={80} />
          <Link
            href={`/restaurants/`}
            className="text-xs py-1.5 bg-zinc-200 rounded-full font-semibold mt-8 hover:bg-red-500 hover:text-white cursor-pointer w-full"
          >
            Para levar
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductBadge;
