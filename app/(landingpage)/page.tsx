import AnimatedBackground from "@/components/page/landing-page/animated-background";
import Examples from "@/components/page/landing-page/examples";
import Header from "@/components/page/landing-page/header";
import Hero from "@/components/page/landing-page/hero";
import Pricing from "@/components/page/landing-page/pricing-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <Examples />
        <Pricing />
      </main>
    </div>
  );
}
