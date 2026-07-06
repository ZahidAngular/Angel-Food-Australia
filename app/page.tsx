import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Intro } from "@/components/Intro";
import { WheelSection } from "@/components/WheelSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ImageFeature } from "@/components/Editorial";
import { Why } from "@/components/Why";
import { Trade } from "@/components/Trade";
import { Mission } from "@/components/Mission";
import { Footer } from "@/components/Footer";
import { cheeses, meats } from "@/lib/data";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />

      <WheelSection>
        <Intro />
      </WheelSection>

      <WheelSection>
        <ProductGrid
          id="cheese"
          eyebrow="Discover Our Range"
          title="Dairy-Free Cheese"
          lead="Real flavour. Real performance. 100% dairy free — designed to cook, melt and taste exactly as they should."
          products={cheeses}
        />
      </WheelSection>

      <WheelSection>
        <ImageFeature
          eyebrow="For Foodservice"
          title="Built for the way Australia's kitchens work."
          body="From independent cafés through to national restaurant groups, our products are designed for consistency, ease of preparation and exceptional performance — pizzas, burgers, deli sandwiches and gourmet meals."
          img="/img/chef.jpg"
        />
      </WheelSection>

      <WheelSection>
        <ProductGrid
          id="meats"
          eyebrow="No Compromise"
          title="Plant-Based Meats"
          lead="Developed to satisfy serious food lovers — authentic flavour and satisfying texture, from burgers to deli favourites."
          products={meats}
          dark
        />
      </WheelSection>

      <WheelSection>
        <Why />
      </WheelSection>

      <WheelSection>
        <Trade />
      </WheelSection>

      <WheelSection>
        <Mission />
      </WheelSection>

      <Footer />
    </main>
  );
}
