import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      {" "}
      <div className="relative h-screen flex justify-center items-center">
        {children}
      </div>
    </Suspense>
  );
};

export default Layout;
