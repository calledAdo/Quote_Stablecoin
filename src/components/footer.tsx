import React from "react";
import { FooterProps } from "@lib/interfaces";
import { motion } from "framer-motion";


export const Footer: React.FC<FooterProps> = ({
    className,

    ...props
  }) => {
    return (
      <footer
      className="relative rounded-t-2xl overflow-clip px-24"
        {...props}
      >

  
        <section className="flex flex-col text-white gap-y-4">
            <span className="flex flex-row items-center justify-between gap-x-2 py-8">
           
        <p className="text-4xl font-satoshi-bold ">QUOTE</p>
        <p className="text-sm dark:text-white">2024  QUOTE. All right reserved</p>
            </span>

        {/* <p className="w-[40%] text-base font-satoshi">A dollar-pegged decentralized algorithmic stablecoin utilizing virtual perp positions on $ETH</p> */}
      
        </section>
  
        <motion.div
        className="w-72 h-72 absolute right-0 bg-blur dark:bg-blur-dark dark:opacity-70 blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 20, y: -20 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      />
      </footer>
    );
  };