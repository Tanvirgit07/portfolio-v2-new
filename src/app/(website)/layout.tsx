import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div >

        {/* Main Content */}
        <div className="">
          {children}
        </div>
      </div>
    </>
  );
}

export default layout;
