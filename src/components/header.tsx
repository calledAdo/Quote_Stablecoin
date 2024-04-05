import React, { useEffect, useRef, useState } from "react";
import { HeaderProps, ViewProps } from "@lib/interfaces";
import { Icon } from "@iconify/react";
import { HeaderItems } from "@constants";
import { motion } from "framer-motion";
import { scrolltoHash } from "../lib/utils";

export const Header: React.FC<HeaderProps> = ({
  className,
  route,
  setRoute,
  ...props
}) => {
  const [initialBorderWidth, setInitialBorderWidth] = useState(0);
  const [borderWidth, setBorderWidth] = useState(1);
  const animateBorder = () => {
    setBorderWidth(0);
    setInitialBorderWidth(1);
    setTimeout(() => {
      setBorderWidth(1);
      setInitialBorderWidth(0);
    }, 300);
  };
  return (
    <header
      className={`flex flex-row fixed w-screen backdrop-blur h-22 items-center justify-between bg-background px-24 z-50 py-4 bg-opacity-5 ${className}`}
      {...props}
    >
      <img src="./quote_coin.svg" className="object-contain w-12 h-12" />

      <section className="flex flex-row items-center justify-center gap-x-20 ml-32">
        {HeaderItems.map((item) => (
          <button
            className="flex flex-col items-center text-black hover:text-primary font-satoshi-medium transition-all"
            onClick={() => {
              setRoute(item.route);
              animateBorder();
              scrolltoHash(item.hashId)
            }}
          >
            <motion.hr
              className={`${
                route === item.route ? "bg-primary" : "bg-transparent"
              } w-20 h-2 absolute top-0 rounded-b-xl border-0`}
              initial={{ scaleX: initialBorderWidth }}
              animate={{ scaleX: borderWidth }}
            />
            <p className="text-base mt-4">{item.route}</p>
          </button>
        ))}
      </section>

      <button className="bg-primary hover:bg-pink-600 hover:scale-90 w-52 px-5 h-14 text-white rounded-full transition-all">
        Launch App
      </button>
    </header>
  );
};
