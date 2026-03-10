import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper/LayoutWrapper";




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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          
          <LayoutWrapper>
            <main>{children}</main>
          </LayoutWrapper>
         
        </AuthProvider>
      </body>
    </html>
  );
}
