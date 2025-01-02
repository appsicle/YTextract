import type { Metadata } from "next";
import { Suspense } from 'react'
import { Inter } from "next/font/google";
import "./globals.css";

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
      <Suspense fallback={<div>Loading...</div>}>
        <body className={inter.className}>{children}</body>
      </Suspense>
    </html>
  );
}
