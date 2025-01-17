"use client"
import Header from "@/components/core/Header";
import BackgroundBeams from "@/components/ui/background-beams";
import React from "react";
import { TermsSection } from "@/components/ui/terms";
import Ico from "@/../public/ico1.png";
import Ico2 from "@/../public/ico2.png";
import Ico3 from "@/../public/ico3.png";
import Ico4 from "@/../public/ico4.png";
import Image from "next/image";
import { StaticImageData } from "next/image";
const Page = () => {
  return (
    <div className="w-full min-h-screen text-white overflow-hidden overflow-x-hidden">
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
      <BackgroundBeams />
      <Header />
      <div className="w-full h-[800px] z-[1] absolute overflow-y-hidden overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto bg-black mb-10 outfit-font bg-opacity-50 border-zinc-900 border-[1px] rounded-lg overflow-hidden">
        <div className="container mx-auto px-8 py-8 h-[700px] overflow-scroll">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <TermsSection
            title="NITRO BOOSTER [FW]"
            items={[
              "Revoke warranty for 15 days.",
              "No Auto-claim warranty.",
              "Revoke = Replace/Refund - If there is no revoke wave. (Need proper proofs, such as screen recording while claiming that code, mail screenshot, etc.)",
              "Invalid proofs = No replacement/refund.",
              "Don't stack more than 2 nitro credit in 1 account",
              "Replacement is only possible when you provide a screen recording from the beginning as soon as I drop the Nitro.",
              "You are required to fill our report form which includes video proof from the moment of claiming showing your credits and email",
              "You must also go to the subscription page while recording and also show your account information, such as and username.",
              "Special Note : No Refund/Replacement if The Nitro Gets Revoked In Mass Revoke Wave.",
              "NITRO BOOST FW = 15 DAYS WARRANTY"
            ]}
            note="15days warranty does not mean the product is of low quality, its the same as before but its just that the warranty is less"
          />

          <TermsSection
            title="NITRO BOOSTER (LEGAL PAID)"
            items={[
              "100% Legal Paid Using Discord's Localized Pricing",
              "0% Chance Of Getting Auto claimed",
              "30 Days Revoke Warranty Revoke Warranty As Well",
              "NITRO BOOSTER ( LEGAL PAID ) = 30 DAYS WAR"
            ]}
          />

          <TermsSection
            title="REGEN LINK"
            items={[
              "Send Links For Regen When The Links Are 14-20h, If You Send Lower Links I Will Not Do Regen And Im Offline And They Expire, I Wont Be Able To Regen And You Wont Get Any Compensations."
            ]}
          />

          <TermsSection
            title="NITRO BOOSTER [GIFT LINK]"
            items={[
              "No War",
              "No Auto-claim warranty.",
              "Special Note : No Refund/Replacement if The Nitro Gets Revoked In Mass Revoke Wave."
            ]}
          />

          <TermsSection
            title="NITRO BASIC"
            items={[
              "Revoke warranty for 15 days.",
              "No Auto-claim warranty.",
              "Revoke = Replace/Refund - If there is no revoke wave. (Need proper proofs, such as screen recording while claiming that code, mail screenshot, etc.)",
              "Invalid proofs = No replacement/refund.",
              "Don't stack more than 2 nitro credit in 1 account",
              "Replacement is only possible when you provide a screen recording from the beginning as soon as I drop the Nitro.",
              "You are required to fill our report form which includes video proof from the moment of claiming showing your credits and email",
              "You must also go to the subscription page while recording and also show your account information, such as and username.",
              "Special Note : No Refund/Replacement if The Nitro Gets Revoked In Mass Revoke Wave."
            ]}
          />

          <TermsSection
            title="3M SERVER BOOST"
            items={[
              "Instant Delivery After Payment - Fully Automated",
              "Boosts Delivered Within Minutes.",
              "No Watermark or Brand Tag on Boosts, easy to resell",
              "Use Permanent Server Invite Link with Unlimited Use",
              "Duration : Boosts Last 25-30 Days, Perfect for Resellers | No Warranty",
              "We are not responsible for boosts that are lost if boosting accounts are kicked by your anti-raid bot or manually.",
              "Additionally, we do not transfer boosts, and boosts will not be recompensated if a promotion is revoked by Discord.",
              "If Discord revokes the Nitro tokens used for boosting, no replacement will be given.",
              "In any other case by any scenario if the server boosts are lost by any thing i wont be responsible, no refund or replace will be provided."
            ]}
          />

          <TermsSection
            title="1M SERVER BOOST"
            items={[
              "Instant Delivery After Payment - Fully Automated",
              "Boosts Delivered Within Minutes.",
              "No Watermark or Brand Tag on Boosts, easy to resell",
              "Use Permanent Server Invite Link with Unlimited Use",
              "Duration : Boosts Last 25-30 Days, Perfect for Resellers | No Warranty",
              "We are not responsible for boosts that are lost if boosting accounts are kicked by your anti-raid bot or manually.",
              "Additionally, we do not transfer boosts, and boosts will not be recompensated if a promotion is revoked by Discord.",
              "If Discord revokes the Nitro tokens used for boosting, no replacement will be given.",
              "In any other case by any scenario if the server boosts are lost by any thing i wont be responsible, no refund or replace will be provided."
            ]}
          />

          <TermsSection
            title="3M NITRO TOKEN"
            items={[
              "Nitro tokens are discord tokens that have 3 month of discord nitro on them.",
              "Nitro and the boosts on these tokens expire in 85-90 days.",
              "Nitro on the discord tokens is legally gained using automated tools.",
              "Cannot be used as a personal account as this is a discord token and not a full access discord account.",
              "Tokens are never resold or reused.",
              "All tokens have been checked before uploading.",
              "Ultra high quality (UHQ) tokens made using ultra high quality.",
              "No replacement of tokens on getting Error while joining the servers",
              "5 Minutes Warranty",
              "No replacement/refund if discount Term Tokens.",
              "Format -> email:pass:token OR Just token",
              "Changing Token Pass isn't Advised Since That Might Coz You Captcha !",
              "5 Minutes Warranty After Your Order Has Been Deleivered [ No Refund/Replacement If They Get Invaild/Flagged/Locked After Given Warranty Time"
            ]}
            note="Do NOT log in to the tokens manually as there is a high chance the token will get flagged or locked if logged in manually. Use good tools and good proxies. Do NOT use flagged tools."
          />

          {/* Add more TermsSection components for the remaining sections */}

          <TermsSection
            title="IMPORTANT NOTICE"
            items={[
              "Our Terms Of Service can change at any time.",
              "Once purchased from 'Dukaan Services' you agree to this Terms Of Service."
            ]}
          />
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
            className="absolute top-[100px] rotate-[40deg] opacity-100 right-[250px] blur-[4px] float-animation float-animation-delay-1"
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
            className="absolute top-[150px] rotate-[25deg] opacity-100 left-[150px] blur-sm float-animation float-animation-delay-3"
            width={100}
            priority={false}
          />
    </div>
    </div>
  );
};

export default Page;
