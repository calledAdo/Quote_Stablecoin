import { Button } from "@components";
import React, { useState } from "react";

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
        <p className="font-satoshi-bold text-3xl z-10">How Does It Work?</p>
        <p className="font-satoshi text-xl z-10 mt-10">
          We utilize a two-token system $QUOTE, the stablecoin, and $LETH.
          $QUOTE is always pegged to $1 USD using delta-neutral virtual
          perpetual positions on Ethereum (ETH) and is backed by 400% ETH. 
          <br/>
          <br/>
          $LETH acts as a counterweight by managing long positions on $ETH. When the
          price of ETH goes up, $LETH also increases in value and vice versa,
          balancing the system and ensuring $QUOTE stays stable at $1.
        </p>

<div className="flex flex-row gap-x-4 mt-10">
<Button text="Mint Quote" className="w-48 font-satoshi-medium"/>
<Button text="Deposit ETH" className="w-48 bg-transparent border border-primary text-gray-700 font-satoshi-medium hover:bg-pink-600 hover:border-0 hover:text-white"/>
</div>
 
      </section>

      <section>
        <img src="./quote_icon.svg" className="w-[32rem] h-[32rem]" />
      </section>
    </main>
  );
}
