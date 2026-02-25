import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-rose/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 animate-fade-in-up tracking-wide">
          Elegance in Every Detail
        </h1>
        <p className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Premium glass items for your home, crafted with care
        </p>
        <a
          href="#products"
          className="inline-block border-2 border-primary-foreground text-primary-foreground px-10 py-3 text-sm tracking-[0.25em] font-body hover:bg-primary-foreground hover:text-primary transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          SHOP ALL
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
