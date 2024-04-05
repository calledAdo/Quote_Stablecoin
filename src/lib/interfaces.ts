import { Dispatch, SetStateAction } from "react";

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
export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
  route: string;
  setRoute: Dispatch<SetStateAction<string>>
}
export interface FooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string;
}


