import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { StoreInitializer } from "@/components/shared/StoreInitializer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
    title: 'Futsal Booking Platform',
    description: 'Book futsal courts with PayHere integration',
    icons: {
        icon: '/GU.png',
        apple: '/GU.png',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreInitializer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
