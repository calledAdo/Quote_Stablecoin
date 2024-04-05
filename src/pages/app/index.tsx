import { AppHeader, Line } from "@components";
import { useState } from "react";
import Mint from "./mint";
import Redeem from "./redeem";
import Pool from "./pool";
import { Icon } from "@iconify/react";
import { openLink } from "../../lib/utils";
import {motion} from "framer-motion"
import { METAMASK_LINK, TRUST_WALLET_LINK } from "@constants";

export default function AppLanding() {
  const [route, setRoute] = useState<string>("Mint");
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const ShowRoute = () => {
    if (route === "Mint") {
      return <Mint />;
    } else if (route === "Redeem") {
      return <Redeem />;
    } else if (route === "Pool") {
      return <Pool />;
    }
  };
  return (
    <main className="flex flex-col h-full relative">
      <AppHeader
        className=""
        setShowWallet={setShowWallet}
        route={route}
        setRoute={setRoute}
      />

      <ShowRoute />

      {showWallet && (
        <motion.section className="h-[95%] mt-4 mb-20 w-72 absolute right-5 z-50 p-4 shadow-lg rounded-2xl bg-white border border-neutral-200" initial={{ x: 100 }}
        whileInView={{ x: 0}}
        viewport={{ once: true }}
        transition={{ mass: 200, duration: 0.2, ease: "easeInOut", delay: 0 }}>
          <span className="flex flex-row w-full justify-between">
            <p className="font-satoshi-medium text-lg">Connect Wallet</p>
            <Icon icon={"formkit:close"} onClick={()=>{setShowWallet(false)}} className="w-6 h-6 text-black" />
          </span>
          <button
            className="flex flex-row gap-x-3 mt-7 items-center"
            onClick={() => {
              openLink(METAMASK_LINK);
            }}
          >
            <img src="./metamask.svg" className="w-8 h-8" />
            <p className="font-satoshi-medium text-lg">Metamask</p>
          </button>
          <Line className="w-full mt-2" />

          <button
            className="flex flex-row gap-x-3 mt-10 items-center"
            onClick={() => {
              openLink(TRUST_WALLET_LINK);
            }}
          >
            <img src="./trust_wallet.svg" className="w-8 h-8" />
            <p className="font-satoshi-medium text-lg">Trust Wallet</p>
          </button>
          <Line className="w-full mt-2" />
          <a href="https://github.com/greatonical/quote-stablecoin/blob/frontend/README.md#how-to-guides" target="_blank" className="text-primary absolute bottom-5 underline flex flex-row">
            View Minting guide here
            <Icon icon={"octicon:arrow-up-right-24"} className="w-5 h-5"/>
          </a>
        </motion.section>
      )}
    </main>
  );
}
