import React, { ButtonHTMLAttributes } from "react";
import cl from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild | React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className={cl.btn} {...rest}>
      {children}
    </button>
  );
}
