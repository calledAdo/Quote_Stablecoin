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

    
    </main>
  );
}
