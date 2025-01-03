import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./home";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YTExtract",
  description: "Youtube video insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
