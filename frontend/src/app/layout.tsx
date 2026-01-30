"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import TermsModal from "@/components/TermsModal";
import GlobalAuthModal from "@/components/AuthModal/GlobalAuthModal";
import WelcomePopup from "@/components/Common/WelcomePopup";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={`dark:bg-black ${inter.className}`}>
        <Providers>
          <TermsModal />
          <div className="isolate">
            <Header />
            {children}
            <Footer />
          </div>
          <ScrollToTop />
          <GlobalAuthModal />
          <WelcomePopup />
        </Providers>
      </body>
    </html>
  );
}

