import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Github, Mail } from 'lucide-react';
import BazaarLogo from './BazarLogo';
import NewsletterForm from './NewsletterForm'; 

export default function Footer() {
   
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--primary)] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Company Info */}
                    <div className="space-y-5">
                        <div className="brightness-0 invert opacity-80">
                            <BazaarLogo />
                        </div>
                        <p className="text-[#94a3b8] text-sm leading-relaxed">
                            Bazaar is your premier destination for curated quality. 
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[var(--secondary)] transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[var(--secondary)] transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[var(--secondary)] transition-all">
                                <Github size={18} />
                            </a>
                        </div>
                    </div>

                    {/* ২. Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 tracking-tight">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-[#94a3b8]">
                            <li><Link href="/" className="hover:text-[var(--secondary)] transition-colors">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-[var(--secondary)] transition-colors">All Products</Link></li>
                        </ul>
                    </div>

                    {/* ৩. Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 tracking-tight">Support</h3>
                        <ul className="space-y-3 text-sm text-[#94a3b8]">
                            <li><Link href="/contact" className="hover:text-[var(--secondary)] transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-[var(--secondary)] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* ৪. Newsletter*/}
                    <div>
                        <h3 className="text-lg font-bold mb-6 tracking-tight">Newsletter</h3>
                        <p className="text-sm text-[#94a3b8] mb-4">Stay updated with our latest offers.</p>
                        <NewsletterForm />
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[#64748b]">
                    <p className="text-xs">
                        &copy; {currentYear} Bazaar. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs hover:text-white transition-colors cursor-pointer">
                        <Mail size={14} /> <span>support@bazaar.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}