import React, { useRef, useState } from "react";
import { HeaderProps, OTPInputProps, ViewProps } from "@lib/interfaces";
import { Icon } from "@iconify/react";

export const Header: React.FC<HeaderProps> = ({ className, route, setRoute, ...props }) => {
  return (
    <main
      className={`flex flex-row relative w-screen h-16 items-center justify-between pt-2 bg-white px-24 ${className}`}
      {...props}
    >
      <img src="./quote_logo.svg" className="object-contain w-12 h-12" />

<object className="flex flex-col items-center">
  <hr className="bg-primary w-20 h-2 absolute top-0 rounded-b-xl"/> 
<p className="text-black text-base">How it works</p>
</object>
 
    </main>
  );
};
