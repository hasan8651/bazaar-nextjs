import React from 'react';
import BazaarLogo from './BazarLogo';
import { Search, ShoppingCart, Heart, User } from 'lucide-react'; 

const Navbar = () => {
    return (
        <nav className='p-4 md:p-5 flex items-center bg-gray-400 justify-between  text-black sticky top-0 z-50 shadow-sm'>
            {/* Logo */}
            <div className='flex items-center'>
                <BazaarLogo />
            </div>

            {/* search bar  */}
            <div className='hidden md:flex flex-1 mx-10'>
                <div className='relative w-full max-w-md mx-auto'>
                    <input 
                        type="text" 
                        placeholder="Search for products..." 
                        className='w-full py-2 px-4 pl-10 rounded-full border-1 focus:outline-none focus:ring-2 focus:ring-black/20'
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
                </div>
            </div>

            {/* icons*/}
            <div className='flex items-center space-x-5 md:space-x-8'>
                {/* search icon for mobile */}
                <button className='md:hidden hover:opacity-70'>
                    <Search size={24} />
                </button>

                <div className='flex flex-col items-center cursor-pointer hover:opacity-70'>
                    <User size={22} />
                    <span className='text-[10px] font-bold hidden md:block'>Account</span>
                </div>

                <div className='relative flex flex-col items-center cursor-pointer hover:opacity-70'>
                    <Heart size={22} />
                    <span className='absolute -top-1 -right-1 bg-white text-black text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center shadow-sm'>0</span>
                    <span className='text-[10px] font-bold hidden md:block'>Wishlist</span>
                </div>

                <div className='relative flex flex-col items-center cursor-pointer hover:opacity-70'>
                    <ShoppingCart size={22} />
                    <span className='absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center'>0</span>
                    <span className='text-[10px] font-bold hidden md:block'>Cart</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;