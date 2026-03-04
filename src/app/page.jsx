
import Hero from "@/components/layout/Hero";
import PopularCategories from "@/components/layout/PopularCategories/PopularCategories";
import Testimonials from "@/components/layout/Testimonials";
import WhyShopWithUs from "@/components/layout/WhyShopWithUs/WhyShopWithUs";
import FeatureProducts from "@/components/product/FeatureProducts";
import FlashDeals from "@/components/product/FlashDeals/FlashDeals";
import TopBrands from '@/components/product/TopBrands';
// import TopProducts from '@/components/product/TopProducts';
// import UpcomingProducts from "@/components/product/UpcomingProducts";


export default function Home() {
  return (
    <main>
      
      <Hero />
      <FlashDeals />
      {/* <TopProducts></TopProducts>
      <UpcomingProducts></UpcomingProducts> */}
      <FeatureProducts />
      <PopularCategories/>
      <TopBrands></TopBrands>
      <Testimonials />
      <WhyShopWithUs/>
      
    </main>
  );
}