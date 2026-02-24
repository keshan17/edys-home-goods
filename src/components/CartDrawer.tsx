import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { items, removeItem, isOpen, setIsOpen, totalCount, addItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart ({totalCount})
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-body">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.name} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm" />
                  <div className="flex-1">
                    <h3 className="font-display text-sm text-foreground">{item.name}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-1">{item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      <button
                        onClick={() => addItem({ name: item.name, price: item.price, image: item.image })}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.name)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border">
            <button className="w-full bg-primary text-primary-foreground py-3 font-body text-sm tracking-[0.15em] hover:opacity-90 transition-opacity">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
