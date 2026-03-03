import { ShoppingBag, Loader2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductsSection = () => {
  const { data: products, isLoading } = useShopifyProducts(6);
  const { addItem, isLoading: cartLoading } = useCartStore();

  const handleAddToCart = async (product: (typeof products)[number]) => {
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
    <section id="products" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-4">
          Featured Products
        </h2>
        <p className="text-muted-foreground text-center mb-14 font-body max-w-lg mx-auto">
          Handpicked glassware to elevate your living spaces
        </p>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">No products found</p>
            <p className="text-muted-foreground/70 font-body text-sm mt-2">
              Products will appear here once added to the store.
            </p>
          </div>
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
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        disabled={cartLoading}
                        className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 disabled:opacity-50"
                        aria-label={`Add ${product.node.title} to cart`}
                      >
                        {cartLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </Link>
                  <h3 className="font-display text-base md:text-lg text-foreground">{product.node.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
