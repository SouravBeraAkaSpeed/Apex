import React from "react";

const Page = () => {
  return (
    <div className="z-10 h-full">
      <div className="mt-10 text-white flex flex-col items-center justify-center">
        <div className=" flex text-[40px] font-semibold">Create Profile</div>
        <span className="flex text-sm text-gray-400">
          *By completing the full profile you can access to all features.
        </span>
      </div>

      <div className="flex items-center justify-center px-10 mt-10">
        <div className="flex w-[650px] mx-10 bg-white h-[700px]"></div>

        <div className="flex w-[500px] mx-10 bg-white h-[700px]"></div>
      </div>
    </div>
  );
};

export default Page;
