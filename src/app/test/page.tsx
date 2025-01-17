"use client"
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.sellix.io/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.initializeSellixEmbed) {
        window.initializeSellixEmbed();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <button
        data-sellix-product="66a0de6c1e028,66a1cbf42d1df,66a1cc51755a8"
        type="submit"
      >
        Purchase
      </button>
    </div>
  );
};

export default Page;