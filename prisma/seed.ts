/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(
    async (tx: any) => {
      // Deleta todos os restaurantes existentes
      await tx.restaurant.deleteMany();

      // Criação do primeiro restaurante (restaurant)
      const restaurant = await tx.restaurant.create({
        data: {
          name: "MCDonalds",
          slug: "mcdonalds",
          description: "Avenida Vladimir Lenine, Maputo, Maputo 1107",
          avatarImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLjNm8tOodoAFPm5kCJVeXv3Y0HSxMQKynB7dD",
          coverImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLoh7Qd7kWdHKJCQeTs5w2S3lkp9LcMyPu7oGb",
        },
      });

      // Criação do segundo restaurante (restaurant2)
      const restaurant2 = await tx.restaurant.create({
        data: {
          name: "KFC",
          slug: "kfc",
          description: "Av Karl Max, N.1836 1836 Maputo, Mozambique",
          avatarImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLOIpN501EgIN8Uwn3QboR0K6YxyB1htMc4pAP",
          coverImageUrl:
            "https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CLmSy5JUNpBi2n8AQDuF9koMjeOVz07yHcqLEX",
        },
      });

      // Função para criar categorias e produtos para um restaurante
      const createCategoriesAndProducts = async (restaurantId: string) => {
        // Criação das categorias de menu para o restaurante
        const combosCategory = await tx.menuCategory.create({
          data: {
            name: "Combos",
            restaurantId,
          },
        });

        const hamburguersCategory = await tx.menuCategory.create({
          data: {
            name: "Lanches",
            restaurantId,
          },
        });

        const frenchFriesCategory = await tx.menuCategory.create({
          data: {
            name: "Fritas",
            restaurantId,
          },
        });

        const drinksCategory = await tx.menuCategory.create({
          data: {
            name: "Bebidas",
            restaurantId,
          },
        });

        // Criação dos produtos para o restaurante
        await tx.product.createMany({
          data: [
            {
              name: "McOferta Média Big Mac Duplo",
              description:
                "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
              price: 399.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
              menuCategoryId: combosCategory.id,
              restaurantId,
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
              price: 419.59,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
              menuCategoryId: combosCategory.id,
              restaurantId,
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
              price: 399.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
              menuCategoryId: combosCategory.id,
              restaurantId,
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
              restaurantId,
              ingredients: [
                "Pão escuro com gergelim",
                "Hambúrguer de carne 100% bovina",
                "Molho lácteo com queijo tipo cheddar",
                "Cebola ao molho shoyu",
              ],
            },
            {
              name: "Big Mac",
              description:
                "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
              ingredients: [
                "Pão com gergilim",
                "Hambúrguer de carne 100% bovina",
                "Alface americana",
                "Queijo fatiado sabor cheddar",
                "Molho especial",
                "Cebola",
                "Picles",
              ],
              price: 399.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
              menuCategoryId: hamburguersCategory.id,
              restaurantId,
            },
            {
              name: "Duplo Quarterão",
              description:
                "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
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
              price: 419.59,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
              menuCategoryId: hamburguersCategory.id,
              restaurantId,
            },
            {
              name: "McMelt",
              description:
                "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
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
              price: 39.9,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
              menuCategoryId: hamburguersCategory.id,
              restaurantId,
            },
            {
              name: "McNífico Bacon",
              description:
                "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
              ingredients: [
                "Pão escuro com gergelim",
                "Hambúrguer de carne 100% bovina",
                "Molho lácteo com queijo tipo cheddar",
                "Cebola ao molho shoyu",
              ],
              price: 369.29,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
              menuCategoryId: hamburguersCategory.id,
              restaurantId,
            },
            {
              name: "Fritas Grande",
              description:
                "Batatas fritas crocantes e sequinhas. Vem bastante!",
              ingredients: [],
              price: 109.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
              menuCategoryId: frenchFriesCategory.id,
              restaurantId,
            },
            {
              name: "Fritas Média",
              description:
                "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
              ingredients: [],
              price: 99.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
              menuCategoryId: frenchFriesCategory.id,
              restaurantId,
            },
            {
              name: "Fritas Pequena",
              description:
                "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
              ingredients: [],
              price: 59.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
              menuCategoryId: frenchFriesCategory.id,
              restaurantId,
            },
            {
              name: "Coca-cola",
              description: "Coca-cola gelada para acompanhar seu lanche.",
              ingredients: [],
              price: 59.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
              menuCategoryId: drinksCategory.id,
              restaurantId,
            },
            {
              name: "Fanta Laranja",
              description: "Fanta Laranja gelada para acompanhar seu lanche.",
              ingredients: [],
              price: 59.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
              menuCategoryId: drinksCategory.id,
              restaurantId,
            },
            {
              name: "Água Mineral",
              description: "A bebida favorita do Cristiano Ronaldo.",
              ingredients: [],
              price: 29.99,
              imageUrl:
                "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
              menuCategoryId: drinksCategory.id,
              restaurantId,
            },
          ],
        });
      };

      // Cria categorias e produtos para ambos os restaurantes
      await createCategoriesAndProducts(restaurant.id);
      await createCategoriesAndProducts(restaurant2.id);
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
