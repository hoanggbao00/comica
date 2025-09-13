import { Button } from "@/components/ui/button";

const SalesBanner = () => {
  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl border-4 border-black font-comic shadow-comic-lg">
        <img
          src="/images/studio/sales-banner.jpg"
          alt="AI Comic Creation Sale Banner"
          className="h-64 w-full object-cover md:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-start p-8">
          <div className="max-w-md text-white">
            <h2 className="mb-4 font-black text-4xl text-shadow-lg md:text-6xl">50% OFF</h2>
            <p className="mb-6 font-bold text-xl md:text-2xl">Create Amazing Comics with AI!</p>
            <Button className="btn-comic px-8 py-4 text-lg">Get Started Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesBanner;
