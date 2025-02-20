import { Clock, StarIcon } from "lucide-react";
import Image from "next/image";
import CategoryList from "./components/categorylist";
import Header from "./components/header";
import ProductList from "./components/product-list";

const Restaurant = () => {
  return (
    <>
      <Header />
      <div className=" absolute border-b shadow-xs border-zinc-100 bg-white rounded-t-3xl w-full p-4 -mt-6 z-50 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 ">
            <Image
              src="/logo.png"
              alt="Restaurant Logo"
              height={45}
              width={45}
            />
            <div className="">
              <h1 className="text-xl font-semibold">YCM Donald&apos;s</h1>
              <p className="text-sm text-zinc-400">Fast Food</p>
            </div>
          </div>
          <div className="px-4">
            <span className="flex text-sm items-center border border-zinc-200 rounded-3xl gap-1 px-3 py-1">
              <StarIcon className="h-4 w-4 p-0 text-amber-500 fill-amber-500 " />
              5.0
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-500">
          <Clock className="h-4 w-4" /> Aberto
        </div>
      </div>
      <div className="mt-30 px-4 ">
        <CategoryList />
      </div>
      <ProductList />
    </>
  );
};

export default Restaurant;
