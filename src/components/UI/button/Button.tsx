import React, { ButtonHTMLAttributes } from "react";
import cl from "./Button.module.scss";

enum Colors {
  primary = "#4e428a",
  secondary = "#201f1f",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild | React.ReactNode;
  color?: Colors;
}

export default function Button({ children, color, ...rest }: ButtonProps) {
  return (
    <button className={cl.btn} {...rest}>
      {children}
    </button>
  );
}
