import FeatureProducts from './Components/FeatureProducts';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import Testimonials from './Components/Testimonials';
import TopBrands from './Components/TopBrands';
import TopProducts from './Components/TopProducts';
import UpcomingProducts from './Components/UpcomingProducts';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TopProducts />
      <UpcomingProducts />
      <FeatureProducts />
      <TopBrands />
      <Testimonials />
      <Footer />
    </main>
  );
}