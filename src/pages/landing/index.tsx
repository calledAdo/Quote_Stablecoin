import { Footer, Header } from "@components";
import { useState } from "react";
import Home from "./home";

// import Works from "./works";
import Docs from "./docs";
import Pricing from "./pricing";
import FAQS from "./faqs";

export default function Landing() {
  const [route, setRoute] = useState<string>("Home");

  return (
    <main className="flex flex-col">
      <Header className="" route={route} setRoute={setRoute} />

      <Home/>
      {/* <Works /> */}
      <Docs />
      <Pricing />
      <FAQS />

      <Footer className="" />
    </main>
  );
}
