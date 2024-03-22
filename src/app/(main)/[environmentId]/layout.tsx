import Header from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/dashboard/sidebar";
import React from "react";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    environmentId: string;
  };
}) => {
  return (
    <div className="lg:flex">
      <Header />
      <Sidebar environmentId={params.environmentId} />
      <div className="pl-10 lg:pl-[16rem] pt-20 lg:pt-10 w-full">{children}</div>
    </div>
  );
};

export default Layout;