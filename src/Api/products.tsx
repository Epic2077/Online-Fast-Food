import { BaseURL } from "./BASEURL";

//Every Product contain: Name, Price, Description, Image
export interface Product {
  name: string;
  price: string;
  Description: string;
  img: string;
}

export const fetchProduction = async (): Promise<Product[]> => {
  const response = await fetch(`${BaseURL}/foods`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
