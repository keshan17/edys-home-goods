import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import prod5 from "@/assets/prod-5.jpg";
import prod6 from "@/assets/prod-6.jpg";

const products = [
  { name: "Crystal Wine Glass", price: "LKR 2,500", image: prod1 },
  { name: "Flora Glass Vase", price: "LKR 4,800", image: prod2 },
  { name: "Elegance Serving Bowl", price: "LKR 3,200", image: prod3 },
  { name: "Amber Candle Holder", price: "LKR 1,800", image: prod4 },
  { name: "Whiskey Tumbler Set", price: "LKR 5,500", image: prod5 },
  { name: "Globe Pendant Light", price: "LKR 8,900", image: prod6 },
];

const ProductsSection = () => {
  const { addItem } = useCart();

  return (
    <section id="products" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-4">
          Featured Products
        </h2>
        <p className="text-muted-foreground text-center mb-14 font-body max-w-lg mx-auto">
          Handpicked glassware to elevate your living spaces
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.name} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-card mb-4 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <button
                  onClick={() => addItem(product)}
                  className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-display text-base md:text-lg text-foreground">{product.name}</h3>
              <p className="font-body text-sm text-muted-foreground mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
