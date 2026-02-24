import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <AboutSection />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
