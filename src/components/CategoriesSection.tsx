import catDrinkware from "@/assets/cat-drinkware.jpg";
import catVases from "@/assets/cat-vases.jpg";
import catTableware from "@/assets/cat-tableware.jpg";
import catLighting from "@/assets/cat-lighting.jpg";

const categories = [
  { name: "Drinkware", image: catDrinkware },
  { name: "Vases", image: catVases },
  { name: "Tableware", image: catTableware },
  { name: "Lighting", image: catLighting },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 md:py-28 bg-background">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-4">
          Shop by Category
        </h2>
        <p className="text-muted-foreground text-center mb-14 font-body max-w-lg mx-auto">
          Explore our curated collections of premium glass items for every room in your home
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg md:text-xl text-primary-foreground tracking-[0.15em]">
                  {cat.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
