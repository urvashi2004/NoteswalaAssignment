"use client";

// app/layout.js
import './globals.css'; // your global styles
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      body.classList.add("page-transition");

      const timeout = setTimeout(() => {
        body.classList.remove("page-transition");
      }, 800); // Match the transition duration in CSS

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          <div className="page-transition-container">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
