/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(
    async (tx: any) => {
      await tx.restaurant.deleteMany();

      // Criação do primeiro restaurante (restaurant)
      const restaurant = await tx.restaurant.create({
        data: {
          name: "FSW Donalds",
          slug: "fsw-donalds",
          description: "Avenida Vladimir Lenine, Maputo, Maputo 1107",
          avatarImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLjNm8tOodoAFPm5kCJVeXv3Y0HSxMQKynB7dD",
          coverImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLCyaq7TvB2ThHd3SiqV7lzRQWmXtyUG6FoJAY",
        },
      });

      // Criação do segundo restaurante (restaurant2)
      const restaurant2 = await tx.restaurant.create({
        data: {
          name: "YCM Donalds",
          slug: "ycm-donalds",
          description: "Av Karl Max, N.1836 1836 Maputo, Mozambique",
          avatarImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLK9P89tIOVyrxAc869dDkZ7ueaUBvCLpQGXwn",
          coverImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLHbSq6xZF6lRIYJd5KaXoCPQEeyBp09MmVSbT",
        },
      });

      // Criação das categorias de menu para o restaurant
      const combosCategory = await tx.menuCategory.create({
        data: {
          name: "Combos",
          restaurantId: restaurant.id,
        },
      });

      // Criação dos produtos para o restaurant
      const products = [
        {
          name: "McOferta Média Big Mac Duplo",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
        },
        {
          name: "McCrispy Chicken Elite",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
        },
        {
          name: "Duplo Cheddar McMelt",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
        },
      ];

      // Criar os mesmos produtos para o restaurant2
      const createProductsForRestaurant = products.map((product) => ({
        ...product,
        restaurantId: restaurant2.id, // Altere para associar ao restaurant2
      }));

      await tx.product.createMany({
        data: [...products, ...createProductsForRestaurant],
      });

      // Repita o processo de criação para as outras categorias e produtos, conforme necessário
    },
    {
      timeout: 30000,
    }
  );
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
