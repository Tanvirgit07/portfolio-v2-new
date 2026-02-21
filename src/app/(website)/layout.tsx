import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">

        {/* Main Content */}
        <div className="">
          {children}
        </div>
      </div>
    </>
  );
}

export default layout;
