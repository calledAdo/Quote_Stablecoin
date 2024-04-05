import React from "react";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <main className="flex flex-row px-24 items-center justify-center relative">
      <img
        src="./lines.svg"
        className="w-full h-fit object-cover object-top absolute z-0"
      />
      <motion.img
        src="./usd_coin.svg"
        className="w-24 h-24 object-contain object-top right-80 top-24 absolute z-0"
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.img
        src="./quote_coin.svg"
        className="w-24 h-24 object-contain object-top top-0 left-80 absolute z-0"
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
      <span className="flex flex-row gap-x-9 mt-10">
        <motion.p className="bg-clip-text bg-gradient-to-br from-primary-900 via-primary-900 via-30% to-primary-700 text-transparent text-center text-5xl font-satoshi-bold"  initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 1 }}>
          1 <br /> $QUOTE
        </motion.p>
        <p className="bg-clip-text bg-gradient-to-br from-primary-900 via-primary-900 via-30% to-primary-700 text-5xl text-transparent text-center font-satoshi-bold">
          :
        </p>
        <motion.p
          className="bg-clip-text bg-gradient-to-br from-primary-900 via-primary-900 via-30% to-primary-700 text-transparent text-center text-5xl font-satoshi-bold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ mass: 200, duration: 1, ease: "easeInOut", delay: 1.5 }}
        >
          {" "}
          1 <br /> $USD
        </motion.p>
      </span>
    </main>
  );
}
