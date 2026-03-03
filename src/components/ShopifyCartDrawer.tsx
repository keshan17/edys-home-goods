import { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const ShopifyCartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart, totalCount } = useCartStore();

  // Expose open function globally for navbar
  useEffect(() => {
    (window as any).__openShopifyCart = () => setIsOpen(true);
    return () => { delete (window as any).__openShopifyCart; };
  }, []);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || 'LKR';

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart ({totalCount})
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-body">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const image = item.product.node.images?.edges?.[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-20 overflow-hidden rounded-sm bg-muted flex-shrink-0">
                      {image && <img src={image.url} alt={item.product.node.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-sm text-foreground">{item.product.node.title}</h3>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                      </p>
                      {item.selectedOptions.length > 0 && item.variantTitle !== "Default Title" && (
                        <p className="font-body text-xs text-muted-foreground/70">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="text-muted-foreground hover:text-foreground">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-body text-xs text-muted-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="text-muted-foreground hover:text-foreground">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-lg">{currencyCode} {totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 font-body text-sm tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" /> CHECKOUT
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopifyCartDrawer;
