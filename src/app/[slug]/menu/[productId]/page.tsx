import { notFound } from "next/navigation";
import { db } from "../../../../../lib/prisma";
import ProductDetais from "./components/product-detais";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          slug: true,
          name: true,
          avatarImageUrl: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }
  return (
    <div className="flex flex-col h-full">
      <ProductHeader product={product} />
      {/* Product details */}
      <ProductDetais product={product} />
    </div>
  );
};

export default ProductPage;
