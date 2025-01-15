// components/ui/Loading.tsx
import Image from "next/image";
import React from "react";
import Logo from "@/../public/animation.gif";
const Loading: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center background items-center relative overflow-hidden">
      <div className="loader">
        <Image src={Logo} alt="Logo" width={180} />
        <style jsx>{`
          .loader {
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loading;
