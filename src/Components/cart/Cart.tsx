import { useEffect, useState } from "react";
import { cartArray } from "../cards/FoodCard";

export default function CartContainer() {
  const [carts, setCarts] = useState(cartArray);

  useEffect(() => {
    setCarts([...cartArray]);
  }, [cartArray]);

  const updateCartQuantity = (productName: string, change: number) => {};
}
