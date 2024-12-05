import React from "react";
import { Product } from "../../Api/products";

interface FoodCardProps {
  product: Product;
}

const FoodCard: React.FC<FoodCardProps> = ({ product }) => {
  return (
    <div className="w-[26%] h-[400px] shadow-[0px_4px_40px_-16px_rgba(0,_0,_0,_0.8)] rounded-[10px] p-6">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-[180px] mx-auto object-cover rounded-t-[10px]"
      />
      <h3 className="text-[20px] font-semibold mt-4">{product.name}</h3>
      <p className="text-gray-400 text-[16px] mt-2">{product.Description}</p>
      <div className="flex">
        <p>{product.price}</p>
        <div></div>
      </div>
    </div>
  );
};

export default FoodCard;
