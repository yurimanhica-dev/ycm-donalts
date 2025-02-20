import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps {
  products: Product[];
}
const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams();

  return (
    <div className="space-x-3">
      {products.map((product) => (
        <Link key={product.id} href={`/${slug}/menu/${product.id}`}>
          <div className="flex border-b border-zinc-300 p-4 w-full justify-between shadow">
            <div className="px-4">
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-2 font-semibold">
                {Intl.NumberFormat("pt-MZ", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "MZN",
                }).format(product.price)}
              </p>
            </div>
            <Image
              src={product.imageUrl}
              alt={product.name}
              height={100}
              width={100}
              className="bg-zinc-200 rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
