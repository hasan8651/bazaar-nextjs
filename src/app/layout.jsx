import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper/LayoutWrapper";
import ChatBot from "@/components/common/ChatBot";
// import { CartProvider } from "@/lib/CartContext";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PrimeMart - Your Shopping Partner",
  description: "Easy and Smart Shopping",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          
          {/* <CartProvider> */}
            <LayoutWrapper>
            <main>{children}
              <ChatBot/>
            </main>
          </LayoutWrapper>
          {/* </CartProvider> */}
         
        </AuthProvider>
      </body>
    </html>
  );
}
