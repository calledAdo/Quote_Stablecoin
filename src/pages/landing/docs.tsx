import React from "react";
import { motion } from "framer-motion";

export default function Docs() {
  return (
    <main id="docs" className="w-full px-24 pb-24 gap-y-4 flex flex-col z-10">
      <section className="flex flex-row gap-x-4 justify-between">
        <motion.div
          className="bg-white shadow-lg rounded-xl p-5 w-[110%]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1}}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0 }}
        >
          <p className="text-xl font-satoshi-medium">Peg Stability</p>
          <p className="mt-7">
          Each $QUOTE token is backed by at least 400% ETH and kept pegged to a dollar by virtual delta-neutral positions on $ETH.
          </p>
        </motion.div>

        <motion.div className="bg-white shadow-lg rounded-xl p-5 w-[90%]"  initial={{ opacity: 0 }}
          whileInView={{ opacity: 1}}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.4 }}>
          <p className="text-xl font-satoshi-medium">Decentralized</p>
          <p className="mt-7">
          $QUOTE is fully algorithmic and  decentralized, ensuring transparency, autonomy, and censorship resistance.
          </p>
        </motion.div>
      </section>

      <section className="flex flex-row gap-x-4 justify-between">
        <motion.div className="bg-white shadow-lg rounded-xl p-5 w-[90%]"  initial={{ opacity: 0 }}
          whileInView={{ opacity: 1}}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 0.8 }}>
            <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-satoshi-medium">Yield Rate</p>
          <p className="text-base font-satoshi-medium bg-primary-300 px-2 py-1 rounded-lg">Up to 12%</p>
            </div>

          <p className="mt-7">
            By depositing $ETH to our pool, you get $LETH which allows you to
            share in rewards from $QUOTE minting fees and staking yields.
          </p>
        </motion.div>

        <motion.div className="bg-white shadow-lg rounded-xl p-5 w-[110%]"  initial={{ opacity: 0 }}
          whileInView={{ opacity: 1}}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 1.2 }}>
          <p className="text-xl font-satoshi-medium">Capital Efficiency</p>
          <p className="mt-7">
          Our system maintains a minimum 1:4 and maximum 1:8 ratio of $QUOTE to $ETH, optimizing capital allocation for users to achieve stable exposure to the market while ensuring maximum returns for $LETH holders.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
