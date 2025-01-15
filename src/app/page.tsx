import Header from "@/components/core/Header";
import Hero from "@/components/core/Hero";
import Image from "next/image";
import Shape3 from "@/../public/Shape3.png";
import Products from "@/components/api/Products";

export default function Home() {
  return (
    <div className="w-full h-screen background pb-8 relative">
            <Image
        src={Shape3}
        alt="Background"
        className="w-full absolute bottom-0 left-0"
        width={1000}
      />
      <Header />
      <Hero />
      <div className="max-w-[1200] m-auto">
        <Products />
      </div>

      {/* <Image
        src={Shape1}
        alt="Background"
        className="absolute top-[100px] blur-md opacity-80 right-0"
        width={250}
      />
      <Image
        src={Shape2}
        alt="Background"
        className="absolute bottom-0 opacity-80 left-0 blur-md"
        width={300}
      /> */}

    </div>
  );
}
