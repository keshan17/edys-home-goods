import { useState } from "react";
import { X, Search } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-x-4 top-24 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl bg-card z-50 shadow-2xl rounded-sm animate-fade-in">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent font-body text-foreground placeholder:text-muted-foreground outline-none text-sm"
            autoFocus
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-4">
          {query.trim() === "" ? (
            <p className="text-muted-foreground font-body text-sm text-center py-8">
              Type to search products...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm text-center py-8">
              No products found
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((product) => (
                <button
                  key={product.name}
                  onClick={() => {
                    navigate(`/category/${product.category.toLowerCase()}`);
                    onClose();
                    setQuery("");
                  }}
                  className="flex gap-4 w-full text-left hover:bg-muted/50 p-2 rounded-sm transition-colors"
                >
                  <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-sm" />
                  <div>
                    <h3 className="font-display text-sm text-foreground">{product.name}</h3>
                    <p className="font-body text-xs text-muted-foreground">{product.price}</p>
                    <p className="font-body text-xs text-muted-foreground/70 mt-0.5">{product.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchDialog;
