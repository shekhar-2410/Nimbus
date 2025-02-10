import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      {/* header */}
      <Header />
      <main className="min-h-screen container mx-auto  px-4 py-4">
        {children}
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Layout;
