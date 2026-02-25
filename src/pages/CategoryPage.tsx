import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const displayName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="container py-12 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            {displayName}
          </h1>
          <p className="text-muted-foreground font-body mb-12 max-w-lg">
            Browse our premium {displayName?.toLowerCase()} collection
          </p>

          {filtered.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-20">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((product) => (
                <div key={product.name} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-card mb-4 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
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
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </div>
  );
};

export default CategoryPage;
