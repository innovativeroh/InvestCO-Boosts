"use client";
import type { NextPage } from "next";
import Header from "@/components/core/Header";
import Hero from "@/components/core/Hero";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Ico from "@/../public/ico1.png";
import Ico2 from "@/../public/ico2.png";
import Ico3 from "@/../public/ico3.png";
import Ico4 from "@/../public/ico4.png";
import Shape3 from "@/../public/Shape3.png";
import Products from "@/components/api/Products";
import BackgroundBeams from "@/components/ui/background-beams";
import Script from "next/script";
import Head from "next/head";
import Loading from "@/app/loading/page";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-screen overflow-hidden pb-8 relative">
          {/* Meta data for icon and title */}
          <Head>
            <title>Your Website Title</title>
            <link rel="icon" href="/images/logo.png" type="image/png" />
          </Head>

          {/* Sellix embed CSS */}
          <link
            href="https://cdn.sellix.io/static/css/embed.css"
            rel="stylesheet"
          />

          {/* Load the Sellix embed script after the page is interactive */}
          <Script
            src="https://cdn.sellix.io/static/js/embed.js"
            strategy="beforeInteractive"
            async
          />
          <BackgroundBeams />
          <style jsx global>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
                }
                50% {
                  transform: translateY(-20px);
                  }
                  100% {
                    transform: translateY(0px);
                    }
            }
            .float-animation {
              animation: float 6s ease-in-out infinite;
              }
              .float-animation-delay-1 {
                animation-delay: 1s;
                }
                .float-animation-delay-2 {
                  animation-delay: 2s;
                  }
                  .float-animation-delay-3 {
                    animation-delay: 3s;
                    }
                    `}</style>

          <Image
            src={Shape3 as StaticImageData}
            alt="Background"
            className="w-full absolute bottom-0 left-0"
            width={1000}
            priority
          />
          <Header />
          <div className="w-full h-[800px] z-[1] absolute overflow-y-scroll">
            <Hero />
            <div className="max-w-[1200] m-auto p-5">
              <Products />
            </div>
          </div>
          <Image
            src={Ico as StaticImageData}
            alt="Background"
            className="absolute top-[650px] opacity-100 left-[-250px] blur-md float-animation"
            width={500}
            priority={false}
          />
          <Image
            src={Ico2 as StaticImageData}
            alt="Background"
            className="absolute top-[250px] opacity-100 right-[450px] blur-[4px] float-animation float-animation-delay-1"
            width={140}
            priority={false}
          />
          <Image
            src={Ico3 as StaticImageData}
            alt="Background"
            className="absolute top-[300px] opacity-100 right-[-280px] blur-lg float-animation float-animation-delay-2"
            width={600}
            priority={false}
          />
          <Image
            src={Ico4 as StaticImageData}
            alt="Background"
            className="absolute top-[150px] opacity-100 left-[150px] blur-sm float-animation float-animation-delay-3"
            width={100}
            priority={false}
          />
        </div>
      )}
    </>
  );
};

export default Home;
