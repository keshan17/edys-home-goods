import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";

const ProductsSection = () => {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

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
                  onClick={() => toggleItem(product)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                    isInWishlist(product.name)
                      ? "bg-destructive text-destructive-foreground opacity-100"
                      : "bg-primary text-primary-foreground opacity-0 group-hover:opacity-100"
                  }`}
                  aria-label={`Toggle wishlist for ${product.name}`}
                >
                  <Heart className="w-4 h-4" fill={isInWishlist(product.name) ? "currentColor" : "none"} />
                </button>
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
