import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopifyCartDrawer from "@/components/ShopifyCartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import { toast } from "sonner";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => { window.scrollTo(0, 0); }, [categoryName]);

  const displayName = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : "";
  
  // Search Shopify products by tag or product_type matching category
  const { data: products, isLoading } = useShopifyProducts(20, categoryName ? `tag:${categoryName} OR product_type:${categoryName}` : undefined);

  const handleAddToCart = async (product: NonNullable<typeof products>[number]) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.node.title} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="container py-12 md:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">{displayName}</h1>
          <p className="text-muted-foreground font-body mb-12 max-w-lg">Browse our premium {displayName?.toLowerCase()} collection</p>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : !products || products.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-20">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <div key={product.node.id} className="group">
                    <Link to={`/product/${product.node.handle}`}>
                      <div className="aspect-[4/5] overflow-hidden bg-card mb-4 relative">
                        {image ? (
                          <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                        <button
                          onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                          disabled={cartLoading}
                          className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 disabled:opacity-50"
                          aria-label={`Add ${product.node.title} to cart`}
                        >
                          {cartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                        </button>
                      </div>
                    </Link>
                    <h3 className="font-display text-base md:text-lg text-foreground">{product.node.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-1">{price.currencyCode} {parseFloat(price.amount).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ShopifyCartDrawer />
      <WishlistDrawer />
    </div>
  );
};

export default CategoryPage;
