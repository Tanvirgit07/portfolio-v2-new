import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
        {/* Main Content */}
        <div className="bg-[#EFEFEF]">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default layout;
