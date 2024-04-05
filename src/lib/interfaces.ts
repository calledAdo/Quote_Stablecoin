import { Dispatch, SetStateAction } from "react";
import { DropDown } from "./types";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  className:string;
}
export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  className: string;
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className: string;
}
export interface ViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}
export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
  defaultOption:string;
  defaultImage: string;
  toggling: () => void;
  options: Array<DropDown>
  selectedOption: string
  selectedImage: string
  isOpen: boolean
  onOptionClicked:(coin:string | undefined, image:string | undefined)=> void
}
export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
  route: string;
  setRoute: Dispatch<SetStateAction<string>>

}
export interface AppHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
  route: string;
  setRoute: Dispatch<SetStateAction<string>>
  setShowWallet: Dispatch<SetStateAction<boolean>>
}
export interface FooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string;
}


