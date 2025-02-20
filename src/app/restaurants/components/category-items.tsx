import { Prisma } from "@prisma/client";

interface CategoryItemsProps {
  category: Prisma.MenuCategoryGetPayload<{ include: { products: true } }>;
}

const CategoryItems = ({ category }: CategoryItemsProps) => {
  return (
    <div className="px-4 py-2 rounded-full border border-zinc-300 cursor-pointer text-zinc-400 first:bg-amber-400 first:text-white first:border-none">
      <span className="text-sm">{category.name}</span>
    </div>
  );
};

export default CategoryItems;
