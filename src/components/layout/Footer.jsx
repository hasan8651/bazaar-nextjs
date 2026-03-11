import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Github, Mail } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer 
            className="pt-16 pb-8 transition-colors duration-300 border-t"
            style={{ 
                backgroundColor: "var(--surface)", 
                borderColor: "var(--border)",
                color: "var(--text-primary)"
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <BrandLogo width={180} height={80} />
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
                            PrimeMart is your premier destination for curated quality and exceptional style. 
                            We bridge the gap between world-class craftsmanship and your everyday needs, 
                            bringing a marketplace of excellence right to your doorstep with a commitment 
                            to authenticity and premium service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 rounded-full transition-all hover:scale-110" style={{ backgroundColor: "var(--surface)", color: "var(--primary)" }}>
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full transition-all hover:scale-110" style={{ backgroundColor: "var(--surface)", color: "var(--primary)" }}>
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full transition-all hover:scale-110" style={{ backgroundColor: "var(--surface)", color: "var(--primary)" }}>
                                <Github size={18} />
                            </a>
                        </div>
                    </div>

                    {/* ২. Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 tracking-tight">Quick Links</h3>
                        <ul className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                            <li><Link href="/" className="hover:text-[var(--secondary)] transition-colors">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-(--secondary) transition-colors">All Products</Link></li>
                            <li><Link href="/about" className="hover:text-(--secondary) transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* ৩. Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 tracking-tight">Support</h3>
                        <ul className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                            <li><Link href="/contact" className="hover:text-(--secondary) transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-(--secondary) transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-(--secondary) transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* ৪. Newsletter*/}
                    <div>
                        <h3 className="text-lg font-bold mb-6 tracking-tight">Newsletter</h3>
                        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                            Join our community to stay updated with exclusive offers and latest arrivals.
                        </p>
                        <NewsletterForm />
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 transition-colors" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                    <p className="text-xs">
                        &copy; {currentYear} PrimeMart. Crafted with passion for quality shopping.
                    </p>
                    <div className="flex items-center gap-2 text-xs hover:text-(--secondary) transition-colors cursor-pointer">
                        <Mail size={14} /> <span>support@primemart.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}