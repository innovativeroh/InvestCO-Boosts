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
          <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>

          {/* Nitro Booster FW Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Nitro Booster [FW]</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Revoke warranty for 15 days.</li>
              <li>No auto-claim warranty.</li>
              <li>
                Revoke = Replace/Refund - If there is no revoke wave. (Need
                proper proofs, such as screen recording while claiming that
                code, mail screenshot, etc.)
              </li>
              <li>Invalid proofs = No replacement/refund.</li>
              <li>Don&quot;t stack more than 2 Nitro credits in 1 account.</li>
              <li>
                Replacement is only possible when you provide a screen recording
                from the beginning as soon as I drop the Nitro.
              </li>
              <li>
                You are required to fill out our report form, which includes
                video proof from the moment of claiming showing your credits and
                email.
              </li>
              <li>
                You must also go to the subscription page while recording and
                also show your account information, such as username.
              </li>
              <li>
                <strong>Special Note:</strong> No refund/replacement if the
                Nitro gets revoked in a mass revoke wave.
              </li>
              <li>Nitro Booster FW = 15 Days Warranty</li>
            </ul>
            <p className="mt-4 italic">
              Note: 15 days warranty does not mean the product is of low
              quality; it&quot;s the same as before but just has less warranty.
            </p>
          </section>

          {/* Nitro Booster (Legal Paid) Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Nitro Booster (Legal Paid)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>100% legal paid using Discord&quot;s localized pricing.</li>
              <li>0% chance of getting auto-claimed.</li>
              <li>30 days revoke warranty.</li>
              <li>Nitro Booster (Legal Paid) = 30 Days Warranty</li>
            </ul>
          </section>

          {/* Regen Link Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Regen Link</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Send links for regen when the links are 14-20h.</li>
              <li>
                If you send lower links and I’m offline and they expire, I won’t
                be able to regen, and you won’t get any compensations.
              </li>
            </ul>
          </section>

          {/* Nitro Basic Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Nitro Basic</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Revoke warranty for 15 days.</li>
              <li>No auto-claim warranty.</li>
              <li>
                Revoke = Replace/Refund - If there is no revoke wave. (Need
                proper proofs, such as screen recording while claiming that
                code, mail screenshot, etc.)
              </li>
              <li>Invalid proofs = No replacement/refund.</li>
              <li>Don’t stack more than 2 Nitro credits in 1 account.</li>
              <li>
                Replacement is only possible when you provide a screen recording
                from the beginning as soon as I drop the Nitro.
              </li>
              <li>
                You are required to fill out our report form, which includes
                video proof from the moment of claiming showing your credits and
                email.
              </li>
              <li>
                You must also go to the subscription page while recording and
                also show your account information, such as username.
              </li>
              <li>
                <strong>Special Note:</strong> No refund/replacement if the
                Nitro gets revoked in a mass revoke wave.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
