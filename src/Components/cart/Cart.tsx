import { useEffect, useState } from "react";
import { cartArray } from "../cards/FoodCard";

export default function CartContainer() {
  const [carts, setCarts] = useState(cartArray);

  useEffect(() => {
    setCarts([...cartArray]);
  }, [cartArray]);

  const updateCartQuantity = (productName: string, change: number) => {
    const index = cartArray.findIndex(
      (item) => item.product.name === productName
    );
    if (index !== -1) {
      cartArray[index].quantity += change;

      if (cartArray[index].quantity <= 0) {
        cartArray.splice(index, 1);
      }
      setCarts([...cartArray]);
    }
  };

  return (
    <div className="w-full p-5 bg-white rounded-[10px]">
      <h2 className="text-black text-[25px] font-semibold">Shop Cart</h2>
      <div className="my-5 grid gap-5">
        {carts.length > 0 ? (
          carts.map((cart, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{cart.product.name}</p>
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <button
                  onClick={() => updateCartQuantity(cart.product.name, -1)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>
                <p>{cart.quantity}</p>
                <button
                  onClick={() => updateCartQuantity(cart.product.name, 1)}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
              <p>${parseInt(cart.product.price) * cart.quantity}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
