import FeatureProducts from './Components/FeatureProducts';
import FlashDeal from './Components/Flash-Deals/FlashDeals';
import Hero from './Components/Hero';
import PopularCategories from './Components/PopularCategories/PopularCategories';
import Testimonials from './Components/Testimonials';
// import TopBrands from './Components/TopBrands';
// import TopProducts from './Components/TopProducts';
// import UpcomingProducts from './Components/UpcomingProducts';
import WhyShopWithUs from './Components/WhyShopWithUs/WhyShopWithUs';

export default function Home() {
  return (
    <main>
      
      <Hero />
      <FlashDeal></FlashDeal>
      {/* <TopProducts />
      <UpcomingProducts /> */}
      <FeatureProducts />
      <PopularCategories></PopularCategories>
      {/* <TopBrands /> */}
      <Testimonials />
      <WhyShopWithUs></WhyShopWithUs>
      
    </main>
  );
}