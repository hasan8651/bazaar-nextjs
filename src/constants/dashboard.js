// src/constants/dashboard.js
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  Package, 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Store, 
  Heart, 
  Star, 
  CreditCard,
  PlusCircle,
  MessageSquare,
  TicketPercent,
  UserCircle
} from "lucide-react";

export const MENU_ITEMS = {
  // --- Admin Dashboard Menu ---
  admin: [
    { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { title: "Manage Products", path: "/admin/products", icon: Package },
    { title: "Categories", path: "/admin/categories", icon: PlusCircle },
    { title: "All Orders", path: "/admin/orders", icon: ShoppingBag },
    { title: "Sellers", path: "/admin/sellers", icon: Store },
    { title: "Customers", path: "/admin/customers", icon: Users },
    { title: "Payments", path: "/admin/payments", icon: CreditCard },
    { title: "Coupons", path: "/admin/coupons", icon: TicketPercent },
    { title: "Reports", path: "/admin/reports", icon: BarChart3 },
    { title: "Settings", path: "/admin/settings", icon: Settings },
  ],

  // --- Seller Dashboard Menu ---
  seller: [
    { title: "Dashboard", path: "/seller", icon: LayoutDashboard },
    { title: "My Products", path: "/seller/products", icon: Package },
    { title: "Add Product", path: "/seller/add-product", icon: PlusCircle },
    { title: "Orders", path: "/seller/orders", icon: Truck },
    { title: "Earnings", path: "/seller/earnings", icon: CreditCard },
    { title: "Reviews", path: "/seller/reviews", icon: Star },
    { title: "Shop Settings", path: "/seller/shop-settings", icon: Store },
    { title: "Support", path: "/seller/support", icon: MessageSquare },
  ],

  // --- User (Customer) Dashboard Menu ---
  user: [

    { title: "Dashboard", path: "/user", icon: LayoutDashboard},
    { title: "My Profile", path: "/user/user-profile", icon: UserCircle },
    { title: "My Orders", path: "/user/my-orders", icon: ShoppingBag },
    { title: "Wishlist", path: "/user/wishlist", icon: Heart },
    { title: "My Reviews", path: "/user/reviews", icon: Star },
    { title: "Payment Methods", path: "/user/payments", icon: CreditCard },
    { title: "Address Book", path: "/user/addresses", icon: Truck },
    { title: "Support Ticket", path: "/user/support", icon: MessageSquare },
    { title: "Account Settings", path: "/user/settings", icon: Settings },
  ],
};