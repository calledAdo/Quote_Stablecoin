import React from "react";
import { ViewProps } from "@lib/interfaces";


export const Line: React.FC<ViewProps> = ({ className, ...props }) => {
  return (
    <hr
      className={`bg-neutral-300 w-full h-[0.5px] ${className}`}
      {...props}
    >
     
    </hr>
  );
};