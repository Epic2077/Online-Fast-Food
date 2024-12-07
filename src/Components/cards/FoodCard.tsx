import React, { useEffect, useState } from "react";
import { Product } from "../../Api/products";

export const cartArray: { product: Product; quantity: number }[] = [];
interface FoodCardProps {
  product: Product;
}

const FoodCard: React.FC<FoodCardProps> = ({ product }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = storedCart.find(
      (item: { product: Product }) => item.product.name === product.name
    );
    if (existingItem) {
      setCount(existingItem.quantity);
    }
  }, [product]);

  const updateCart = (product: product, quantity: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = cart.findIndex(
      (item: { product: Product }) => item.product.name === product.name
    );

    if (quantity > 0) {
      if (index === -1) {
        cart.push({ product, quantity });
      } else {
        cart[index].quantity = quantity;
      }
    } else {
      if (index !== -1) {
        cart.splice(index, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Update Cart:", cart);
  };

  const incrimentCount = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateCart(product, newCount);
      return newCount;
    });
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount((prev) => {
        const newCount = prev - 1;
        updateCart(product, newCount);
        return newCount;
      });
    }
  };

  return (
    <div className="w-[26%] h-[400px] shadow-[0px_4px_40px_-16px_rgba(0,_0,_0,_0.8)] rounded-[10px] p-6">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-[180px] mx-auto object-cover rounded-t-[10px]"
      />
      <h3 className="text-[22px] font-semibold mt-4">{product.name}</h3>
      <p className="text-gray-400 text-[16px] mt-2">{product.Description}</p>
      <div className="flex mt-8 items-center justify-between">
        <p className="text-orange-500 text-[20px] font-bold">
          ${product.price}
        </p>
        <div className=" flex justify-between mr-5  border-black border-2 w-[110px] items-center rounded-[10px]">
          <div
            className="ml-[-25px] p-[10px] w-[40px] flex justify-center items-center bg-gray-300 rounded-[10px] "
            onClick={decrementCount}
          >
            -
          </div>
          <p>{count}</p>
          <div
            className="text-white bg-orange-500 p-[10px] w-[40px] flex justify-center items-center mr-[-25px] rounded-[10px]"
            onClick={incrimentCount}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
