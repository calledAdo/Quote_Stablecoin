import { Button, OutlinedButton } from "@components";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Works() {
  const [showSecondText, setShowSecondText] = useState(false);
  return (
    <main
    id="works"
      className="flex flex-row py-44 px-24 z-10 justify-between items-center"
      onDragEnter={() => {
        setShowSecondText(true);
      }}
    >
      <section className="w-[40%] flex flex-col">
        <motion.p className="font-satoshi-bold text-3xl z-10"  initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 0.5, ease: "easeInOut", delay: 0.6 }}>How It Works?</motion.p>
        <motion.p className="font-satoshi text-xl z-10 mt-10"  initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 0.5, ease: "easeInOut", delay: 1.5 }}>
      We utilize a two-token system  - $QUOTE and $LETH. $QUOTE is a stablecoin pegged to $1 USD and kept stable using a <a className="text-primary underline">virtual delta-neutral model</a>.  Each $QUOTE token is backed by at least 400% ETH and can be minted by depositing its equivalent value in ETH.
<br/><br/>
$LETH acts as a balancer by absorbing the market volatility of ETH. When the price of ETH goes up, $LETH also increases in value and vice versa, balancing the system and ensuring $QUOTE stays stable at $1. Users can deposit ETH to the pool to get $LETH and earn yields.
        </motion.p>

<div className="flex flex-row gap-x-4 mt-10">
<Button text="Mint Quote" className="w-48 font-satoshi-medium"/>
<OutlinedButton text="Deposit ETH" className="w-48 bg-transparent border border-primary text-gray-700 font-satoshi-medium hover:bg-pink-600 hover:border-0"/>
</div>
 
      </section>

      <section>
        <img src="./quote_icon.svg" className="w-[32rem] h-[32rem] hover:scale-90 transition-all" />
      </section>
    </main>
  );
}
