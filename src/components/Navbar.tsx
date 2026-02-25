import { useState } from "react";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import SearchDialog from "@/components/SearchDialog";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#about" },
  { label: "CATEGORIES", href: "/#categories" },
  { label: "PRODUCTS", href: "/#products" },
  { label: "CONTACT US", href: "/#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount, setIsOpen: setCartOpen } = useCart();
  const { items: wishlistItems, setIsOpen: setWishlistOpen } = useWishlist();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
        <nav className="container flex items-center justify-between h-20">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-primary-foreground text-xs tracking-[0.2em] font-body hover:opacity-70 transition-opacity">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Diven Casa" className="h-14 w-14 rounded-full object-cover" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(3).map((link) => (
              <a key={link.label} href={link.href} className="text-primary-foreground text-xs tracking-[0.2em] font-body hover:opacity-70 transition-opacity">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <button onClick={() => setSearchOpen(true)}>
                <Search className="w-4 h-4 text-primary-foreground cursor-pointer hover:opacity-70 transition-opacity" />
              </button>
              <button onClick={() => setWishlistOpen(true)} className="relative">
                <Heart className="w-4 h-4 text-primary-foreground cursor-pointer hover:opacity-70 transition-opacity" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button onClick={() => setCartOpen(true)} className="relative">
                <ShoppingBag className="w-4 h-4 text-primary-foreground cursor-pointer hover:opacity-70 transition-opacity" />
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCount}
                </span>
              </button>
            </div>
          </div>

          <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/10 animate-fade-in">
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-primary-foreground text-sm tracking-[0.15em] font-body py-2 hover:opacity-70 transition-opacity" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-6 pt-4 border-t border-primary-foreground/10">
                <button onClick={() => { setSearchOpen(true); setMobileOpen(false); }}>
                  <Search className="w-5 h-5 text-primary-foreground" />
                </button>
                <button onClick={() => { setWishlistOpen(true); setMobileOpen(false); }} className="relative">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
                <button onClick={() => { setCartOpen(true); setMobileOpen(false); }} className="relative">
                  <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
