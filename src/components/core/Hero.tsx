import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";
const Hero = () => {
  return (
    <div className="max-w-[1280px] m-auto p-8">
      <h1 className="text-white text-7xl leading-[80px] outfit-font tracking-[-1.7px] font-[500]">
        Welcome To Dukaan Services <br /> #1 <span className="font-medium">Discord</span> Supplier
      </h1>
      <div className="mt-10 flex flex-wrap gap-8">
        <span className="flex flex-wrap text-white items-center gap-2">
          <FaCheck className="text-blue-400" />{" "}
          <p className="outfit-font">5000+ Products Sold</p>
        </span>
        <span className="flex flex-wrap text-white items-center gap-2">
          <FaCheck className="text-blue-400" />{" "}
          <p className="outfit-font">Over 2000+ Vouches</p>
        </span>
        <span className="flex flex-wrap text-white items-center gap-2">
          <FaCheck className="text-blue-400" />{" "}
          <p className="outfit-font">Cheapest Rates</p>
        </span>
      </div>
      <div className="inline-block mt-10">
        <Link
          href="/discord"
          className="font-semibold bg-gradient-to-r from-fuchsia-300  to-violet-500 flex items-center gap-2  py-2 px-6 text-white rounded-md text-md outfit-font shadow-xl"
        >
          Know More <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
