import Footer from './Components/Footer';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
export default function Home() {
  return (
    <main>
      <Navbar /> 
      <Hero/>
      <div className="flex flex-col h-50 items-center justify-center border-2 border-dashed border-indigo-600 m-2">
        <h1 className="text-6xl font-bold text-orange-500">
          Feature/Top Selling Products
        </h1>
        <h1 className="mt-4 text-2xl text-blue-500">Under Development</h1>
      </div>

         <div className="flex flex-col h-50 items-center justify-center border-2 border-dashed border-indigo-600 m-2">
        <h1 className="text-6xl font-bold text-orange-500">
          Upcoming/ Pre-Book Products
        </h1>
        <h1 className="mt-4 text-2xl text-blue-500">Under Development</h1>
      </div>

         <div className="flex flex-col h-50 items-center justify-center border-2 border-dashed border-indigo-600 m-2">
        <h1 className="text-3xl font-bold text-orange-500">
          12 Products from different Categories with CTA
        </h1>
        <h1 className="mt-4 text-2xl text-blue-500">Under Development</h1>
      </div>

         <div className="flex flex-col h-50 items-center justify-center border-2 border-dashed border-indigo-600 m-2">
        <h1 className="text-6xl font-bold text-orange-500">
          TOP BRANDS LOGO CAROUSEL
        </h1>
        <h1 className="mt-4 text-2xl text-blue-500">Under Development</h1>
      </div>
      
   <div className="flex flex-col h-50 items-center justify-center border-2 border-dashed border-indigo-600 m-2">
        <h1 className="text-6xl font-bold text-orange-500">
          TESTIMONIAL / USER REVIEW
        </h1>
        <h1 className="mt-4 text-2xl text-blue-500">Under Development</h1>
      </div>



      <div>
        <Footer/>
      </div>
 
    </main>
    
    
  );
}