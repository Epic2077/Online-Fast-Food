import { useEffect, useState } from "react";
import { fetchProduction, Product } from "../Api/products";
import FoodCard from "./cards/FoodCard";

export default function BodyContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProduction();
        setProducts(data);
      } catch {
        setError("Failed to fetch products");
      }
    };
    loadProducts();
  }, []);

  if (error) {
    return <div>[error]</div>;
  }

  return (
    <section className="mt-5">
      <h2 className="text-center text-[30px]  text-white ">MENU</h2>;
      <div
        className="flex flex-wrap justify-center gap-6 w-full"
        id="cardsContainer"
      >
        {products.map((product) => (
          <FoodCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
