
import Loading from "@/app/loading";
import ProductDetailsClient from "@/components/product/ProductDetailsClient/ProductDetailsClient";
import axiosInstance from "@/lib/axiosInstance";
import { notFound } from "next/navigation";

const ProductDetailsPage = async ({ params }) => {
  const { _id } = await params;


  try {

    const res = await axiosInstance('/products')
    const allProducts = res.data.products
    const singleProduct = allProducts.find(product => product._id == _id)

    return (
      <div>
       <ProductDetailsClient singleProduct={singleProduct}></ProductDetailsClient>
      </div>
    );

  }

  catch(error){
    notFound()
    
  }


};

export default ProductDetailsPage;