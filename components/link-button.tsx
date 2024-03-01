"use client"

import type {variant, size, color, children, className } from "@material-tailwind/react/types/components/button";
import { Button as BaseButton, ButtonProps } from "@material-tailwind/react";
import Link from "next/link";

interface LinkButtonProps extends ButtonProps {
    href?: string;
    type?: "button" | "submit" | "reset";
    variant?: variant;
    size?: size;
    color?: color;
    onClick?: any;
    icon?: any;
    ripple?: boolean;
    children: children;
    className?: className;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

export function Button({ type, href, variant, size, color, onClick, icon, ripple, children, className, target }: LinkButtonProps) {
    const buttonEl = (<>
        <BaseButton type={type || "button"} onClick={onClick} className={`${icon ? "px-3" : ""} ${className}`} color={color || "white"} variant={variant || "outlined"} size={size || "md"} ripple={ ripple||true } placeholder={"Button"}>
            <div className="flex items-center">
                {icon}
                {children}
            </div>
        </BaseButton>
    </>)

    if(href){
        return (
            <Link href={href} target={target || "_self"}>
                {buttonEl}
            </Link>
          );
    }
    else return buttonEl
  
}
