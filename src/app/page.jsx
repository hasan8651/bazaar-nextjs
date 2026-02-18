import Navbar from './Components/Navbar';

export default function Home() {
  return (
    <main>
     
      <Navbar /> 

      <div className="flex flex-col min-h-[80vh] items-center justify-center">
        <h1 className="text-6xl font-bold text-orange-500">
          Hello Bazaar!
        </h1>
        <h1 className="mt-4 text-2xl text-blue-500">Development Branch</h1>
      </div>
    </main>
  );
}