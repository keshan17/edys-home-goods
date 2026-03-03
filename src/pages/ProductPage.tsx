import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopifyCartDrawer from "@/components/ShopifyCartDrawer";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, [handle]);

  const { data: product, isLoading } = useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product || null;
    },
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-40 pb-20">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container pt-28 pb-20 text-center">
          <p className="text-muted-foreground font-body">Product not found.</p>
          <Link to="/" className="text-primary font-body text-sm mt-4 inline-block hover:opacity-70">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="container py-12 md:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-4">
              {images.length > 0 ? (
                images.map((img: { node: { url: string; altText: string | null } }, idx: number) => (
                  <div key={idx} className="aspect-square overflow-hidden bg-card">
                    <img src={img.node.url} alt={img.node.altText || product.title} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="font-display text-3xl md:text-4xl text-foreground">{product.title}</h1>
              <p className="font-display text-xl text-foreground">
                {variant?.price.currencyCode} {parseFloat(variant?.price.amount || '0').toFixed(2)}
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

              {product.variants.edges.length > 1 && (
                <div>
                  <p className="font-body text-sm text-muted-foreground mb-2">Variant</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((v: { node: { id: string; title: string; availableForSale: boolean } }, idx: number) => (
                      <button
                        key={v.node.id}
                        onClick={() => setSelectedVariantIdx(idx)}
                        disabled={!v.node.availableForSale}
                        className={`px-4 py-2 text-sm font-body border transition-colors ${
                          idx === selectedVariantIdx
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-foreground hover:border-primary'
                        } ${!v.node.availableForSale ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAdd}
                disabled={cartLoading || !variant?.availableForSale}
                className="mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 px-8 font-body text-sm tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {cartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ShopifyCartDrawer />
    </div>
  );
};

export default ProductPage;
