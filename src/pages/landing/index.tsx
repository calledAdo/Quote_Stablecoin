import { scrolltoHash } from "@lib/utils";
import { Footer, Header } from "@components";
import React, { useState } from "react";
import Home from "./home";
import { motion } from "framer-motion";
import Works from "./works";
import Docs from "./docs";
import Pricing from "./pricing";
import FAQS from "./faqs";

export default function Landing() {
  const [route, setRoute] = useState<string>("Home");

  return (
    <main className="flex flex-col">
      <Header className="" route={route} setRoute={setRoute} />


      <Home />
      <Works/>
      <Docs/>
      <Pricing/>
      <FAQS/>

      <Footer className=""/>
    </main>
  );
}
