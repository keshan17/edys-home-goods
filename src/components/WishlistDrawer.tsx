import { X, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const WishlistDrawer = () => {
  const { items, toggleItem, isOpen, setIsOpen } = useWishlist();
  const { addItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5" /> Wishlist ({items.length})
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Heart className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-body">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.name} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm" />
                  <div className="flex-1">
                    <h3 className="font-display text-sm text-foreground">{item.name}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-1">{item.price}</p>
                    <button
                      onClick={() => {
                        addItem(item);
                        setIsOpen(false);
                      }}
                      className="mt-2 flex items-center gap-1 text-xs font-body text-primary hover:opacity-70 transition-opacity"
                    >
                      <ShoppingBag className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                  <button onClick={() => toggleItem(item)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
