
// import TopBrands from './Components/TopBrands';
// import TopProducts from './Components/TopProducts';
// import UpcomingProducts from './Components/UpcomingProducts';
import Hero from "@/components/layout/Hero";
import PopularCategories from "@/components/layout/PopularCategories/PopularCategories";
import Testimonials from "@/components/layout/Testimonials";
import WhyShopWithUs from "@/components/layout/WhyShopWithUs/WhyShopWithUs";
import FeatureProducts from "@/components/product/FeatureProducts";
import FlashDeals from "@/components/product/FlashDeals/FlashDeals";


export default function Home() {
  return (
    <main>
      
      <Hero />
      <FlashDeals />
      {/* <TopProducts />
      <UpcomingProducts /> */}
      <FeatureProducts />
      <PopularCategories/>
      {/* <TopBrands /> */}
      <Testimonials />
      <WhyShopWithUs/>
      
    </main>
  );
}