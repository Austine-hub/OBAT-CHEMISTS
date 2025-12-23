// app/page.tsx

import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import ServiceCards from "@/components/banner/PharmacyBanners";
import PromoBanner from "@/components/banner/PharmacyPromo";
import PharmacyFeatures from "@/components/banner/PharmacyFeatures";
import GetStarted from "@/components/getstarted/GetStarted";
import ProductGrid from "@/components/products/ProductsGrid";
import PopularProducts from "@/components/products/PopularProducts";
import ProductGrid2 from "@/components/products/ProductGrid2";
import HealthCenter from "@/components/center/HealthCare";
import DealsOfTheDay from "@/components/DealsOfTheDay/DealsOfTheDay";
import HealthLabCarousel from "@/components/lab/HealthLabCarousel";

export const metadata: Metadata = {
  title: "OBAT CHEMISTS",
  description: "Modern Pharmacy solutions — clean, accessible and fast.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Accessible page heading for screen readers & SEO */}

      
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="w-full">
        <Hero />
      </section>

       {/* Get Started */}
      <section aria-labelledby="hero-heading" className="w-full">
        <GetStarted />
      </section>

      
       {/*DealsOfTheDay */}
      <section aria-labelledby="hero-heading" className="w-full">
        <DealsOfTheDay/>
      </section>

     {/*HealthLabCarousel*/}
      <section aria-labelledby="hero-heading" className="w-full">
        <HealthLabCarousel/>
      </section>



     {/*ProductGrid */}
      <section aria-labelledby="ProductGrid" className="w-full">
        <ProductGrid/>
      </section>

      {/* Promo Banner — visually distinct, keyboard focusable */}
      <section
        aria-label="Promotional offers"
        className="w-full px-4 sm:px-6 lg:px-8 -mt-4"
      >
        <PromoBanner />
      </section>
    
     {/* PPopularProducts*/}
      <section
        aria-label="PopularProducts"
        className="w-full px-4 sm:px-6 lg:px-8 -mt-4"
      >
        <PopularProducts/>
      </section>

      {/* Services — responsive grid, keeps layout simple */}
      <section
        aria-labelledby="services-heading"
        className="w-full px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="mx-auto max-w-7xl">
           <ServiceCards />
        </div>
      </section>

      {/*ProductGrid2*/}
      <section
        aria-labelledby="services-heading"
        className="w-full px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="mx-auto max-w-7xl">
           <ProductGrid2/>
        </div>
      </section>

      {/* Features — highlight trust, accessibility, performance */}
      <section
        aria-labelledby="features-heading"
        className="w-full px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="mx-auto max-w-7xl">
          <PharmacyFeatures />
        </div>
      </section>


     {/*HealthCenter */}
      <section
        aria-labelledby="features-heading"
        className="w-full px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="mx-auto max-w-7xl">
          <HealthCenter/>
        </div>
      </section>


    </main>
  );
}
