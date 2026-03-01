import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import BrandLogo from '@/components/common/BrandLogo';



export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[var(--background)] px-6 overflow-hidden">
      <div className="relative max-w-lg w-full text-center">
        
        {/* Background Glow - Dynamic color support */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--secondary)]/20 blur-[100px] rounded-full -z-10 animate-pulse" />

        {/* 404 Visual with Branding */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[10rem] md:text-[12rem] font-black text-[var(--primary)] opacity-5 tracking-tighter leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             {/* Brand Name with Accent line */}
             <div className="flex flex-col items-center">
                   <BrandLogo width={240} height={120} />
                
             </div>
          </div>
        </div>
        
        {/* Animated Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Lost in the Market?
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-sm mx-auto">
            The page you're looking for has disappeared from our shelves. Let's get you back home.
          </p>
        </div>

        {/* Home Button with Animation */}
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="btn btn-primary btn-lg !flex items-center justify-center gap-3 shadow-xl hover:shadow-[var(--secondary)]/30 transition-all hover:-translate-y-1 active:scale-95 group "
          >
            <Home size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 flex justify-center items-center gap-4 opacity-20">
            <div className="h-[1px] w-12 bg-[var(--text-secondary)]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--text-secondary)]">PrimeMart Error 404</span>
            <div className="h-[1px] w-12 bg-[var(--text-secondary)]" />
        </div>
      </div>
    </div>
  );
}