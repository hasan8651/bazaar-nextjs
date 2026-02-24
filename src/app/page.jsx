import FeatureProducts from './Components/FeatureProducts';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import PopularCategories from './Components/PopularCategories/PopularCategories';
import Testimonials from './Components/Testimonials';
import TopBrands from './Components/TopBrands';
import TopProducts from './Components/TopProducts';
import UpcomingProducts from './Components/UpcomingProducts';
import WhyShopWithUs from './Components/WhyShopWithUs/WhyShopWithUs';

export default function Home() {
  return (
    <main>
      
      <Hero />
      <TopProducts />
      <UpcomingProducts />
      <FeatureProducts />
      <PopularCategories></PopularCategories>
      <TopBrands />
      <Testimonials />
      <WhyShopWithUs></WhyShopWithUs>
      
    </main>
  );
}