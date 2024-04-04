import React from 'react'
import { ButtonProps } from '@lib/interfaces'

export const Button : React.FC<ButtonProps> = ({text, className, ...props})=>{
    return(
        <button className={`bg-primary h-14 text-white p-3 rounded-full font-satoshi hover:bg-pink-600 hover:scale-90 transition-all  ${className}`} {...props}>
{text}
        </button>
    )
}