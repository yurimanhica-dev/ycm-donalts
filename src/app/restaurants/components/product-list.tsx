import { db } from "../../../../lib/prisma";
import ProductItems from "./product-items";

const ProductList = async () => {
  const products = await db.product.findMany({
    include: {
      menuCategory: true,
    },
  });

  return (
    <div>
      {products.map((product) => (
        <ProductItems key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
