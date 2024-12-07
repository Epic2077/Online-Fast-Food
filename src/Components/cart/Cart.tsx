import { useEffect, useState } from "react";
import { Product } from "../../Api/products";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartContainer() {
  const [carts, setCarts] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const syncCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCarts(storedCart);
    };

    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const updateCartQuantity = (productName: string, change: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = cart.findIndex(
      (item: { product: Product }) => item.product.name === productName
    );

    if (index !== -1) {
      cart[index].quantity += change;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove the item if quantity becomes 0
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Persist changes
    setCarts(cart); // Update state
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
