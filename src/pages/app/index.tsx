import { AppHeader } from "@components";
import { useState } from "react";
import Mint from "./mint";
import Redeem from "./redeem";
import Pool from "./pool";


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
