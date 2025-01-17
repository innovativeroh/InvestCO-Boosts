// components/ui/Loading.tsx
import Image from "next/image";
import React from "react";
import Logo from "@/../public/animation.gif";
import Script from "next/script";
const Loading: React.FC = () => {
  return (
    <>
      <link
        href="https://cdn.sellix.io/static/css/embed.css"
        rel="stylesheet"
      />

      {/* Load the Sellix embed script after the page is interactive */}
      <div className="w-full h-screen flex flex-col gap-2 justify-center background items-center relative overflow-hidden">
        <div className="loader">
          <Image src={Logo} alt="Logo" width={180} />
        </div>
      </div>
      <Script
        src="https://cdn.sellix.io/static/js/embed.js"
        strategy="beforeInteractive"
        async
      />
    </>
  );
};

export default Loading;
