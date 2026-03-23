
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axiosInstance from '@/lib/axiosInstance';


import { getServerSession } from 'next-auth';
import React from 'react';
import MyProduct from '../MyProduct/MyProduct';

const SellerMyProduct = async() => {
   const session = await getServerSession(authOptions)

   const res = await axiosInstance.get(`/products/seller/${session?.user?.id}`)
   const sellerProduct = res.data.products
 
    
 

    return (
       <div>
         <MyProduct sellerProduct={sellerProduct}></MyProduct>
        
      </div>
    );
};

export default SellerMyProduct;