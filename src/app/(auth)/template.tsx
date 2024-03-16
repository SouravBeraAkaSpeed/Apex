import Image from "next/image";
import { Suspense } from "react";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <Suspense>
      {" "}
      <div className="relative h-screen flex justify-center items-center">
        <div className="absolute top-0 bottom-0 z-0">
          <Image
            src="/auth-bg.png"
            alt="auth-bg"
            width={1200}
            height={656}
            className=" bg-center object-center w-screen h-screen"
          />
        </div>
        {children}
      </div>
    </Suspense>
  );
};

export default Template;
