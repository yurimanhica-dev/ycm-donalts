import { db } from "../../../../lib/prisma";
import CategoryItems from "./category-items";

const CategoryList = async () => {
  const categories = await db.menuCategory.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      products: true,
    },
  });
  return (
    <div className="flex sm:justify-center gap-3 [&::-webkit-scrollbar]:hidden overflow-x-scroll min-w-full">
      {categories.map((category) => (
        <CategoryItems key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
