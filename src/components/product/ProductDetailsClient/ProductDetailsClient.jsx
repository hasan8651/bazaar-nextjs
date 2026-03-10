"use client";
import React, { useState } from 'react';
import { Heart, MapPin, Star, Flame, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';

export default function ProductPage({ singleProduct }) {
    const [quantity, setQuantity] = useState(2);
    const [activeTab, setActiveTab] = useState('product details');
    console.log(singleProduct)

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT: Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[6/5] bg-gray-100 rounded-xl overflow-hidden">
                        <img
                            src={singleProduct?.images?.thumbnail}
                            alt="Main Product"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-black cursor-pointer">
                                <img src={singleProduct?.images?.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm mb-1">Sleeve Midi Dress</span>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                        {singleProduct.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center text-yellow-500 gap-1 text-sm font-bold">
                            <Star size={16} fill="currentColor" /> {singleProduct?.rating?.average} <span className="text-gray-400 font-normal">({singleProduct?.rating?.totalReviews} Reviews)</span>
                        </div>
                        <div className="flex items-center text-red-500 gap-1 text-sm font-medium">
                            <Flame size={16} /> 100 Sold in Last 24 hours
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-3xl font-bold text-slate-900">${singleProduct?.pricing?.basePrice}</span>
                        <span className="text-gray-400 line-through">${singleProduct?.pricing?.oldPrice}</span>
                        <div className="flex items-center text-red-500 gap-1 text-sm font-medium">

                        </div>

                    </div>

                    {/* Color Selector */}
                    <div className="mb-6">
                        <p className="font-semibold mb-3">Color</p>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden cursor-pointer hover:ring-2 ring-black">
                                    <img src={singleProduct?.images?.thumbnail} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-8">
                        <p className="font-semibold mb-3">Size</p>
                        <div className="flex gap-3">
                            {['XL', 'M', '2XL', 'XL'].map((size, i) => (
                                <button key={i} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium hover:bg-black hover:text-white transition-colors">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="mb-8">
                        <p className="font-semibold mb-3">Quantity</p>
                        <div className="flex items-center bg-gray-100 rounded-full w-fit px-2 py-1">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2"><Minus size={18} /></button>
                            <span className="px-6 font-bold text-lg">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="p-2"><Plus size={18} /></button>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-black">
                            <MapPin size={18} /> <span className="underline text-sm font-medium">Find a Store</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-black ml-auto">
                            <Heart size={18} /> <span className="underline text-sm font-medium">Add to Wishlist</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn btn-secondary !flex !items-center justify-center gap-2 !rounded-full  lg:!px-15">
                            <ShoppingCart size={20} />
                            <span>Add to Cart</span>
                        </button>
                        <button className="btn btn-primary !rounded-full lg:!px-20">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* TABS & REVIEWS SECTION */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 border-t pt-10">
                <div>
                    <div className="flex gap-8 border-b mb-6 text-gray-400 font-semibold">
                        {['Product Details', 'Seller Info'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`pb-4 transition-all ${activeTab === tab.toLowerCase() ? 'text-black border-b-2 border-black' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'product details' && (
                        <div>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {singleProduct.description}
                            </p>
                            <div className="space-y-2">
                                <p><span className="font-bold">Brand :</span> <span className="text-gray-600 ml-2">{singleProduct.brand}</span></p>
                                <p><span className="font-bold">Slug :</span> <span className="text-gray-600 ml-2">{singleProduct.slug}</span></p>
                                <p><span className="font-bold">Status :</span> <span className="text-gray-600 ml-2">{singleProduct.inventory.stockStatus}</span></p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'seller info' && (
                        <div>

                            <div className="space-y-2">
                                <p><span className="font-bold">Store :</span> <span className="text-gray-600 ml-2">{singleProduct.seller.storeName}</span></p>
                                <p><span className="font-bold">Contact :</span> <span className="text-gray-600 ml-2">{singleProduct.seller.sellerEmail}</span></p>
                                <p><span className="font-bold">Rating :</span> <span className="text-gray-600 ml-2">{singleProduct.seller.sellerRating}</span></p>
                            </div>
                        </div>
                    )}

                    {/* {activeTab === 'care guides' && (
                        <div>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                Follow these care instructions to keep your item looking great...
                            </p>
                            <div className="space-y-2">
                                <p><span className="font-bold">Washing:</span> <span className="text-gray-600 ml-2">Machine wash cold</span></p>
                                <p><span className="font-bold">Drying:</span> <span className="text-gray-600 ml-2">Tumble dry low</span></p>
                                <p><span className="font-bold">Ironing:</span> <span className="text-gray-600 ml-2">Low heat only</span></p>
                            </div>
                        </div>
                    )} */}
                </div>

                {/* Reviews Summary */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Ratings & Reviews</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl font-black">{singleProduct?.rating?.average}</span>
                        <div>
                            <div className="flex text-yellow-500"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" className="text-gray-300" /></div>
                            <p className="text-xs text-gray-400">({singleProduct?.rating?.totalReviews} Reviews)</p>
                        </div>
                    </div>
                    {/* Simple Progress Bar Mockups */}
                    {[5, 4, 3, 2, 1].map((num) => (
                        <div key={num} className="flex items-center gap-3 text-xs mb-2">
                            <span>{num}</span> <Star size={10} fill="currentColor" className="text-yellow-500" />
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: `${num * 15}%` }}></div>
                            </div>
                            <span className="text-gray-400 w-4 text-right">0{num}</span>
                        </div>
                    ))}
                </div>

               
            </div>
        </div>
    );
}