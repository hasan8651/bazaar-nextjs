// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import axiosInstance from "@/lib/axiosInstance";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { data: session } = useSession();
//   const [cartCount, setCartCount] = useState(0);

//   // ✅ FIXED COUNT (quantity sum)
//   const fetchCartCount = async () => {
//     if (!session?.user?.email) return;

//     try {
//       const res = await axiosInstance.get("/cart/my-cart");

//       if (res.data.success && Array.isArray(res.data.data)) {
//         const total = res.data.data.reduce(
//           (sum, item) => sum + item.quantity,
//           0
//         );
//         setCartCount(total);
//       }
//     } catch (error) {
//       console.error("Cart fetch error:", error);
//       setCartCount(0);
//     }
//   };

//   // ✅ ADD TO CART FUNCTION
//   const addToCart = async (product, quantity = 1) => {
//     if (!session?.user?.email) {
//       alert("Login first");
//       return;
//     }

//     const cartItem = {
//       productId: product._id,
//       name: product.name,
//       price: Number(product.pricing.basePrice),
//       quantity,
//       image: product.images?.thumbnail,
//       sellerId: product.seller?.sellerId,
//       userEmail: session.user.email,
//       stock: Number(product.inventory?.totalStock),
//     };

//     try {
//       const res = await axiosInstance.post("/cart/add", cartItem);

//       if (res.data.success) {
//         fetchCartCount(); // 🔥 navbar auto update
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     if (session?.user?.email) {
//       fetchCartCount();
//     } else {
//       setCartCount(0);
//     }
//   }, [session]);

//   return (
//     <CartContext.Provider value={{ cartCount, fetchCartCount, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);