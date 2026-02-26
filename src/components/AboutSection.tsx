const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-primary">
      <div className="container max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">
          About Diven Casa
        </h2>
        <p className="font-body text-primary-foreground/80 leading-relaxed mb-8 text-base md:text-lg">
          At Diven Casa, we believe that the right glassware transforms everyday moments into
          extraordinary experiences. Our curated collection features premium glass items — from
          elegant drinkware and decorative vases to stunning lighting fixtures — each selected
          for its craftsmanship, beauty, and timeless design.
        </p>
        <p className="font-body text-primary-foreground/70 leading-relaxed text-base md:text-lg">
          Whether you're setting a dinner table or styling your living room, Diven Casa brings
          a touch of sophistication to every corner of your home.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
