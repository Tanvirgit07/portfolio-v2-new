import Navbar from "@/components/common/Navbar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
}

export default layout;
