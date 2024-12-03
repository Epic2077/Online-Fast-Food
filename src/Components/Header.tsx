export default function Header() {
  return (
    <div className="bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 w-full h-[100px] flex justify-between items-center px-[50px]">
      <div className="flex items-center">
        <img
          src="../../src/assets/Icons/maki--restaurant-pizza.svg"
          alt="pizza"
          className="w-[55px]"
        />
        <h1 className="text-[40px] text-white font-bold">Online Fast Food</h1>
      </div>
      <h3 className="text-[20px] font-semibold text-white ">
        The Best Quality With The Fastest Delivery
      </h3>
    </div>
  );
}
