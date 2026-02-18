"use client";
import { Send } from 'lucide-react';

export default function NewsletterForm() {
  return (
    <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="bg-gray-800/50 border border-gray-700 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--secondary)] transition-all"
      />
     <button 
  type="submit" 
  className="btn btn-primary btn-sm inline-flex items-center justify-center gap-2"
>
  Subscribe 
</button>
    </form>
  );
}