'use client'

import Header from "@/components/core/Header";
import BackgroundStars from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import React from "react";
import Ico from "@/../public/ico1.png";
import Ico2 from "@/../public/ico2.png";
import Ico3 from "@/../public/ico3.png";
import Ico4 from "@/../public/ico4.png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="w-full h-screen overflow-hidden pb-8 relative text-white outfit-font">
      <Header />
      <BackgroundStars />
      <div className="w-full h-[800px] z-[1] absolute overflow-y-scroll overflow-x-hidden">
      <main className="container max-w-[1200px] m-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.section 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-fuchsia-300 to-indigo-400 bg-clip-text">
            About Us
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
            Your one-stop shop for all things Discord! We specialize in
            providing premium Discord services designed to enhance your
            experience and take your community to the next level.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.section 
            className="bg-gray-800 bg-opacity-50 rounded-lg p-8 shadow-lg"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-semibold mb-6 text-transparent bg-gradient-to-r from-fuchsia-300 to-indigo-400 bg-clip-text">Our Offerings</h2>
            <ul className="space-y-4">
              {[
                { title: "Discord Nitro", description: "Enjoy the full perks of Discord Nitro with affordable and reliable tokens." },
                { title: "Server Boosts", description: "Supercharge your servers with boosts to unlock exclusive features like improved audio quality, custom server banners, and much more." },
                { title: "Nitro Tokens", description: "Convenient and secure Nitro token options to keep your account upgraded effortlessly." }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <svg className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section 
            className="bg-gray-800 bg-opacity-50 rounded-lg p-8 shadow-lg"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-semibold mb-6 text-transparent bg-gradient-to-r from-fuchsia-300 to-indigo-400 bg-clip-text">Our Priorities</h2>
            <ul className="space-y-4">
              {[
                { title: "Reliability", description: "All our services are fast, secure, and backed by a trusted reputation." },
                { title: "Customer Support", description: "Our friendly and responsive support team is always available to assist you." },
                { title: "Affordability", description: "We offer the best prices in the market without compromising quality." }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        <motion.section 
          className="mt-16 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-5xl font-semibold mb-6 text-transparent bg-gradient-to-r from-fuchsia-300 to-indigo-400 bg-clip-text">Join the Dukaan Community</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Join the hundreds of satisfied customers who have trusted us to
            deliver top-tier Discord services. Whether you&quot;re a casual
            user or managing a thriving server, Dukaan Services is here to
            meet your needs.
          </p>
          <p className="text-2xl font-semibold text-white">
            Let&quot;s elevate your Discord experience the Dukaan way!
          </p>
        </motion.section>

        {/* New Social Media Buttons Section */}
        <motion.section
          className="mt-16 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-semibold mb-6 text-transparent bg-gradient-to-r from-fuchsia-300 to-indigo-400 bg-clip-text">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            {[
              { icon: FaInstagram, url: "https://www.instagram.com/", color: "from-pink-500 to-yellow-500" },
              { icon: FaDiscord, url: "https://discord.com/", color: "from-indigo-500 to-purple-600" },
              { icon: FaYoutube, url: "https://www.youtube.com/", color: "from-red-600 to-red-700" }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.section>
      </main>
      <Image
            src={Ico as StaticImageData || "/placeholder.svg"}
            alt="Background"
            className="absolute top-[650px] opacity-100 left-[-250px] blur-md float-animation"
            width={500}
            priority={false}
          />
          <Image
            src={Ico2 as StaticImageData || "/placeholder.svg"}
            alt="Background"
            className="absolute top-[100px] rotate-[40deg] opacity-100 right-[250px] blur-[4px] float-animation float-animation-delay-1"
            width={140}
            priority={false}
          />
          <Image
            src={Ico3 as StaticImageData || "/placeholder.svg"}
            alt="Background"
            className="absolute top-[300px] opacity-100 right-[-280px] blur-lg float-animation float-animation-delay-2"
            width={600}
            priority={false}
          />
          <Image
            src={Ico4 as StaticImageData || "/placeholder.svg"}
            alt="Background"
            className="absolute top-[150px] rotate-[25deg] opacity-100 left-[150px] blur-sm float-animation float-animation-delay-3"
            width={100}
            priority={false}
          />
    </div>
    </div>
  );
};

export default AboutPage;

