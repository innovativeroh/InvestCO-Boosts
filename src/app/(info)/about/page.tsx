import Header from "@/components/core/Header";
import BackgroundBeams from "@/components/ui/background-beams";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen">
        <BackgroundBeams />
      <Header />
      <div className="max-w-[1200px] m-auto bg-black outfit-font bg-opacity-50  border-zinc-900 text-white border-[1px] rounded-lg h-[600px] overflow-y-auto">
        <div className="container mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Welcome to Dukaan Services
          </h1>
          <p className="text-lg mb-6 text-center">
            Your one-stop shop for all things Discord! We specialize in
            providing premium Discord services designed to enhance your
            experience and take your community to the next level.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Offerings</h2>
              <ul className="list-disc list-inside space-y-4">
                <li>
                  <strong>Discord Nitro:</strong> Enjoy the full perks of
                  Discord Nitro with affordable and reliable tokens.
                </li>
                <li>
                  <strong>Server Boosts:</strong> Supercharge your servers with
                  boosts to unlock exclusive features like improved audio
                  quality, custom server banners, and much more.
                </li>
                <li>
                  <strong>Nitro Tokens:</strong> Convenient and secure Nitro
                  token options to keep your account upgraded effortlessly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                At Dukaan Services, we prioritize:
              </h2>
              <ul className="list-disc list-inside space-y-4">
                <li>
                  <strong>Reliability:</strong> All our services are fast,
                  secure, and backed by a trusted reputation.
                </li>
                <li>
                  <strong>Customer Support:</strong> Our friendly and responsive
                  support team is always available to assist you.
                </li>
                <li>
                  <strong>Affordability:</strong> We offer the best prices in
                  the market without compromising quality.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Join the Dukaan Community
              </h2>
              <p className="text-lg">
                Join the hundreds of satisfied customers who have trusted us to
                deliver top-tier Discord services. Whether you&quot;re a casual
                user or managing a thriving server, Dukaan Services is here to
                meet your needs.
              </p>
              <p className="text-lg mt-4 font-semibold">
                Let&quot;s elevate your Discord experience the Dukaan way!
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-lg">
                For inquiries or assistance, feel free to reach out to our
                support team anytime.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
