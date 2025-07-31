import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/shared/ConditionalNavbar";
import { StoreInitializer } from "@/components/shared/StoreInitializer";

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
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
