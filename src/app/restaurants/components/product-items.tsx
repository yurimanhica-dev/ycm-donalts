import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ProductItemsProps {
  product: Prisma.ProductGetPayload<{ include: { menuCategory: true } }>;
}

const ProductItems = ({ product }: ProductItemsProps) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <div>
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={82}
          width={82}
        />
      </div>
    </div>
  );
};

export default ProductItems;
