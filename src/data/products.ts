import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import prod5 from "@/assets/prod-5.jpg";
import prod6 from "@/assets/prod-6.jpg";

export interface Product {
  name: string;
  price: string;
  image: string;
  category: "Drinkware" | "Vases" | "Tableware" | "Lighting";
}

export const products: Product[] = [
  { name: "Crystal Wine Glass", price: "LKR 2,500", image: prod1, category: "Drinkware" },
  { name: "Flora Glass Vase", price: "LKR 4,800", image: prod2, category: "Vases" },
  { name: "Elegance Serving Bowl", price: "LKR 3,200", image: prod3, category: "Tableware" },
  { name: "Amber Candle Holder", price: "LKR 1,800", image: prod4, category: "Lighting" },
  { name: "Whiskey Tumbler Set", price: "LKR 5,500", image: prod5, category: "Drinkware" },
  { name: "Globe Pendant Light", price: "LKR 8,900", image: prod6, category: "Lighting" },
];
