import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axiosInstance from '@/lib/axiosInstance';
import { getServerSession } from 'next-auth';
import React from 'react';
import MyOrder from '../MyOrder/MyOrder';

const SellerOrder = async() => {
  const session = await getServerSession(authOptions)
  console.log(session)
   const res = await axiosInstance.get(`/orders/my-orders?email=${session?.user?.email}&page=1&limit=10`)
   const sellerOrder = res.data || []

    return (
       <div>
        <MyOrder sellerOrder={sellerOrder}></MyOrder>
      </div>
    );
};

export default SellerOrder;