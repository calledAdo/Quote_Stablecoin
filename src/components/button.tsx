import React from 'react'
import { ButtonProps } from '@lib/interfaces'

export const Button : React.FC<ButtonProps> = ({text, className, ...props})=>{
    return(
        <button className={`bg-primary h-14 text-white p-3 rounded-full font-satoshi hover:bg-pink-600 hover:scale-90 transition-all  ${className}`} {...props}>
{text}
        </button>
    )
}
export const OutlinedButton : React.FC<ButtonProps> = ({text, className, ...props})=>{
    return(
        <button className={`bg-transparent border border-primary text-neutral-900 font-satoshi-medium hover:bg-pink-600 hover:text-white hover:border-0 hover:scale-90 rounded-full transition-all  ${className}`} {...props}>
{text}
        </button>
    )
}