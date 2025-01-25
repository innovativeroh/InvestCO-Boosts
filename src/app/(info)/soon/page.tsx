import Header from '@/components/core/Header'
import BackgroundStars from '@/components/ui/background-beams'
import React from 'react'
import Shape3 from "@/../public/Shape3.png";
import Ico from "@/../public/ico1.png";
import Ico2 from "@/../public/ico2.png";
import Ico3 from "@/../public/ico3.png";
import Ico4 from "@/../public/ico4.png";
import Image, {StaticImageData} from 'next/image';
const page = () => {
  return (
    <div className="w-full h-screen overflow-hidden pb-8 relative text-white outfit-font">
        <Header />
        <BackgroundStars />
        <div className='w-full h-screen lg:p-0 p-4 top-0 z-[-1] flex-col gap-4 absolute overflow-hidden flex items-center justify-center text-center'>
            <div className='text-white text-6xl lg:text-8xl font-semibold'>
                Coming Soon!
            </div>
                <p className='text-xl lg:text-2xl'>Good things take time, and this is worth the wait.</p>
        </div>
        <Image
            src={Shape3 as StaticImageData}
            alt="Background"
            className="w-full absolute bottom-0 left-0"
            width={1000}
            priority
          />
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
            className="absolute top-[100px] opacity-100 right-[250px] blur-[4px] float-animation float-animation-delay-1"
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
  )
}

export default page