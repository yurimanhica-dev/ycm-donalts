import RestaurantList from "./components/restaurant-list";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full mt-56 text-center px-6">
      <h1 className="text-5xl font-bold text-red-600 italic">FastFood.</h1>
      <h2 className="text-2xl font-semibold gap-2 mt-4">Seja Bem vindo(a)!!</h2>
      <p className="text-gray-500 mt-2">
        Ao mundo que liga-te as refeições mais rápidas. <br />
        Escolha o restaurante mais próximo <br />
        para começar.
      </p>
      <div className="mt-12">
        <RestaurantList />
      </div>
    </div>
  );
};

export default Home;
