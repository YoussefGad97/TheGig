"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from 'react';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import MobileNavBar from '@/components/MobileNavBar';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className={inter.className + " bg-black flex"} suppressHydrationWarning={true}>
        <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className="hidden md:block" />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 md:ml-64">
            {children}
          </main>
          <Footer />
        </div>
        <MobileNavBar />
      </body>
    </html>
  );
}
