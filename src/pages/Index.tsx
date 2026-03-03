import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ShopifyCartDrawer from "@/components/ShopifyCartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <AboutSection />
      <Footer />
      <ShopifyCartDrawer />
      <WishlistDrawer />
    </div>
  );
};

export default Index;
