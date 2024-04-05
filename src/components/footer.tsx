import React, { useEffect, useRef, useState } from "react";
import { FooterProps, HeaderProps, ViewProps } from "@lib/interfaces";
import { Icon } from "@iconify/react";
import { HeaderItems } from "@constants";
import { motion } from "framer-motion";
import { scrolltoHash } from "../lib/utils";

export const Footer: React.FC<FooterProps> = ({
    className,

    ...props
  }) => {
  
    return (
      <footer
      className="relative pt-10 pb-32 bg-gradient-to-tr from-primary-900 via-primary-900 via-30% to-primary-700 rounded-t-2xl overflow-clip px-24"
        {...props}
      >

  
        <section className="flex flex-col text-white gap-y-4">
            <span className="flex flex-row items-center gap-x-2">
            <img src="./quote_coin.svg" className="object-contain w-12 h-12" />
        <p className="text-4xl font-satoshi-bold">$QUOTE</p>
            </span>

        <p className="w-[40%] text-base font-satoshi">A dollar-pegged decentralized algorithmic stablecoin utilizing virtual perp positions on $ETH</p>
        <button className="bg-primary hover:bg-pink-600 hover:scale-90 w-52 px-5 h-12 text-white rounded-full transition-all">
          Launch App
        </button>
        </section>
  
        <p className="text-sm absolute bottom-10 right-10 text-white">2024  QUOTE. All right reserved</p>
      </footer>
    );
  };